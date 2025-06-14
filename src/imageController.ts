import { RemoteApiController } from "./remoteApiController.ts";

export { ImageController };

class ImageController {
  // The minimum unseen images we'd like to have in local memory at any given time.
  targetNumUnseenImages: number = 4;
  allImages: Array<Array<string>> = [];
  seenImageIds = new Set();
  unseenImageIds: Array<string> = [];
  remoteApiController = new RemoteApiController();

  fetchData(setFetchedInitialData: (fetchedInitialData: boolean) => void) {
    this.remoteApiController.onStart(setFetchedInitialData);
  }

  /** Returns n images where at least one is guaranteed to be unseen. */
  getImages(numImages: number = 4) {
    if (this.allImages.length <= numImages || !this.unseenImageIds) {
      this.queryNewImages();
    }
    if (this.allImages.length <= numImages) {
      console.error(
        "There were  <= the number of images requested. Images may not be unique."
      );
      return this.allImages;
    }
    if (!this.unseenImageIds) {
      console.error("There are no unseen images.");
      return this.allImages.slice(0, numImages - 1);
    }

    const images = new Array(numImages);
    const unseenImage =
      this.allImages[this.getRandomIntegerInRange(this.unseenImageIds.length)];
    images[this.getRandomIntegerInRange(numImages)] = unseenImage;

    for (let i = 0; i < images.length; i++) {
      if (images[i]) {
        continue;
      }
      const totalImages = this.allImages.length;
      const randomIndex = this.getRandomIntegerInRange(totalImages);
      let uniquenessOffset = 0;
      while (
        images.includes(
          this.allImages[(randomIndex + uniquenessOffset) % totalImages]
        )
      ) {
        uniquenessOffset += 1;
        if (uniquenessOffset > totalImages) {
          console.error(
            "Could not find a unique image to show. Showing duplicate."
          );
          break;
        }
      }
      images[i] = this.allImages[randomIndex + uniquenessOffset];
    }
    return images;
  }

  resetImages() {
    this.remoteApiController.shuffleAllImages();
    this.seenImageIds = new Set();
    this.unseenImageIds = [];
    // This will get called if needed when the game component
    // rerenders and requests new images; but I prefer any
    // latency to be on the "new game" click.
    this.queryNewImages();
  }

  isImageSeen(imageId: string) {
    return this.seenImageIds.has(imageId);
  }

  markImageAsSeenAndQueryNewImages(imageId: string) {
    this.seenImageIds.add(imageId);
    this.unseenImageIds.filter((id) => id !== imageId);

    if (this.unseenImageIds.length < this.targetNumUnseenImages) {
      this.queryNewImages();
    }
  }

  queryNewImages(numImages = 16) {
    const newImages = this.remoteApiController.queryNewImages(numImages);
    newImages.forEach((img) => {
      this.allImages.push(img);
      this.unseenImageIds.push(img[0]);
    });
  }

  getRandomIntegerInRange(rangeMax: number) {
    return Math.floor(Math.random() * rangeMax);
  }
}
