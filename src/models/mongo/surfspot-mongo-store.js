import { Surfspot } from "./surfspot.js";
import { Collection } from "./collection.js";


export const surfspotMongoStore = {
  async getAllSurfspots() {
    const surfspots = await Surfspot.find().lean();
    return surfspots;
  },

  async addSurfspot(collectionId, surfspot) {
    surfspot.collectionid = collectionId;
    const newSurfspot = new Surfspot(surfspot);
    const surfspotObj = await newSurfspot.save();
    return this.getSurfspotById(surfspotObj._id);
  },

  async getSurfspotsByCollectionId(id) {
    const surfspots = await Surfspot.find({ collectionid: id }).lean();
    return surfspots;
  },

  async getSurfspotById(id) {
    if (id) {
      const surfspot = await Surfspot.findOne({ _id: id }).lean();
      return surfspot;
    }
    return null;
  },

  async deleteSurfspot(id) {
    try {
      await Surfspot.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllSurfspots() {
    await Surfspot.deleteMany({});
  },

  async updateSurfspot(surfspotid, updatedSurfspot) {
    const surfspot = await Surfspot.findOne({ _id: surfspotid });
    surfspot.name = updatedSurfspot.name;
    surfspot.latitude = updatedSurfspot.latitude;
    surfspot.longitude = updatedSurfspot.longitude;    
    surfspot.typeOfWave = updatedSurfspot.typeOfWave;
    await surfspot.save();
  },

};