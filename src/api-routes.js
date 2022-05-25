import { userApi } from "./api/user-api.js";
import { collectionApi } from "./api/collection-api.js";
import { surfspotApi } from "./api/surfspot-api.js";


export const apiRoutes = [
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

  { method: "POST", path: "/api/collections", config: collectionApi.create },
  { method: "DELETE", path: "/api/collections", config: collectionApi.deleteAll },
  { method: "GET", path: "/api/collections", config: collectionApi.find },
  { method: "GET", path: "/api/collections/{id}", config: collectionApi.findOne },
  { method: "DELETE", path: "/api/collections/{id}", config: collectionApi.deleteOne },

  { method: "GET", path: "/api/surfspots", config: surfspotApi.find },
  { method: "GET", path: "/api/surfspots/{id}", config: surfspotApi.findOne },
  { method: "POST", path: "/api/collections/{id}/surfspots", config: surfspotApi.create },
  { method: "DELETE", path: "/api/surfspots", config: surfspotApi.deleteAll },
  { method: "DELETE", path: "/api/surfspots/{id}", config: surfspotApi.deleteOne },
];