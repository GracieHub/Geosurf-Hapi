import { connectMongo } from "./mongo/connect.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { collectionMongoStore } from "./mongo/collection-mongo-store.js";
import { surfspotMongoStore } from "./mongo/surfspot-mongo-store.js";


export const db = {
  userStore: null,
  collectionStore: null,
  surfspotStore: null,

  init(storeType) {
    switch (storeType) {
      case "mongo":
        this.userStore = userMongoStore;
        this.collectionStore = collectionMongoStore;
        this.surfspotStore = surfspotMongoStore;
        connectMongo();
        break;
      default:
    }
  },
};