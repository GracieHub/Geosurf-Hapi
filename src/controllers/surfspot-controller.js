import { db } from "../models/db.js";

export const surfspotController = {
  index: {
    handler: async function (request, h) {
      const collections = await db.collectionStore.getAllCollections();
      return h.view("Addsurfspot", { title: "Add a new Surfspot", collections: collections });
    },
  },

  report: {
    handler: async function (request, h) {
      const surfspots = await db.surfspotStore.getAllSurfspots();

      return h.view("Report", {
        title: "Surfspots added to Date",
        surfspots: surfspots,
        colletions: collections
      });
    },
  },

  handler: async function (request, h) {
    const surfspot = await db.surfspotStore.getAllSurfspots();
    const newSurfspot = {
      name: request.payload.name,
      latitude: Number(request.payload.latitude),
      longitude: Number(request.payload.longitude),
      typeOfWave: request.payload.typeOfWave,
    };
    await db.surfspotStore.updateSurfspot(surfspot, newSurfspot);
    return h.redirect(`/collection/${request.params.id}`);
  },
  addsurfspot: {
    handler: async function (request, h) {
      try {
        const loggedInUser = request.auth.credentials;
        const rawCollection = request.payload.collection.split(",");
        const collection = await db.collectionStore.findByName(rawCollection[0], rawCollection[1]);
        await db.surfspotStore.addsurfspot(request.payload.name, request.payload.latitude, request.payload.longitude, request.payload.typeOfWave, loggedInUser._id, collection._id);
        return h.redirect("/report");
      } catch (err) {
        return h.view("main", { errors: [{ message: err.message }] });
      }
    },
  },


/*  update: {
    validate: {
      payload: SurfspotSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("surfspot-view", { title: "Edit surfspot error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const surfspot = await db.surfspotStore.getSurfspotById(request.params.surfspotid);
      const newSurfspot = {
        name: request.payload.name,
        latitude: Number(request.payload.latitude),
        longitude: Number(request.payload.longitude),
        typeOfWave: request.payload.typeOfWave,
      };
      await db.surfspotStore.updateSurfspot(surfspot, newSurfspot);
      return h.redirect(`/collection/${request.params.id}`);
    },
  }, */
};

