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
      let potentialIndex = this.getRandomIntegerInRange(this.allImages.length);
      while (images.includes(this.allImages[potentialIndex])) {
        if (potentialIndex + 1 < this.allImages.length) {
          potentialIndex += 1;
        }
        potentialIndex = 0;
      }
      images[i] = this.allImages[potentialIndex];
    }
    return images;
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
