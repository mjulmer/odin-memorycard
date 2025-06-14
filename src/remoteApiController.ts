export { RemoteApiController };

class RemoteApiController {
  cardJsonQuery: string =
    "https://api.hearthstonejson.com/v1/latest/enUS/cards.collectible.json";
  baseUrl: string = "https://art.hearthstonejson.com/v1/256x/";
  // Each card of form [cardID, card name, card image URL]
  allCards: Array<Array<string>> = [];
  // Index marking last point cards have been passed to ImageController.
  cardOffset = 0;

  // Blizzard maintains an official API now, but they want me to use
  // Battle.net AND download an app for 2FA, Lutris isn't playing nicely
  // with Battle.net at the moment.
  // The other fan API I found (https://hearthstoneapi.com/#endpoints) is
  // shutting down in favor of the official API next month.

  onStart(setFetchedInitialData: (fetchedInitialData: boolean) => void) {
    fetch(this.cardJsonQuery)
      .then((response) => {
        if (!response) {
          throw new Error(`Response was null.`);
        }
        return response.body;
      })
      .then((responseBody) => {
        if (!responseBody) {
          throw new Error(`Response body was null.`);
        }
        const reader = responseBody.getReader();
        // Readable stream parsing code from MDN's docs:
        // https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream
        return new ReadableStream({
          start(controller) {
            // The following function handles each data chunk
            function push() {
              reader.read().then(({ done, value }) => {
                if (done) {
                  controller.close();
                  return;
                }
                controller.enqueue(value);
                push();
              });
            }
            push();
          },
        });
      })
      .then((stream) =>
        new Response(stream, {
          headers: { "Content-Type": "text/html" },
        }).text()
      )
      .then((response) => {
        const cardObjects = JSON.parse(response);
        for (const item of cardObjects) {
          if (!item.id || !item.name) {
            console.error("Invalid name or ID for card " + item);
            continue;
          }
          this.allCards.push([
            item.id,
            item.name,
            this.baseUrl + item.id + ".jpg",
          ]);
          if (this.allCards.length > 100) {
            break;
          }
        }
        // TODO: then shuffle cards.
        setFetchedInitialData(true);
      })
      .catch((err) => {
        console.error("Error fetching hearthstone card data: " + err);
      });
  }

  queryNewImages(numImages: number) {
    if (numImages + this.cardOffset < this.allCards.length) {
      this.cardOffset = this.cardOffset + numImages;
      return this.allCards.slice(this.cardOffset - numImages, this.cardOffset);
    }
    const priorOffset = this.cardOffset;
    this.cardOffset = this.allCards.length;
    return this.allCards.slice(priorOffset, this.allCards.length - 1);
  }
}
