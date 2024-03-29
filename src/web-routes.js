// import { aboutController } from "./controllers/about-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
// import { dashboardController } from "./controllers/dashboard-controller.js";
// import { collectionController } from "./controllers/collection-controller.js";
import { surfspotController } from "./controllers/surfspot-controller.js";
// import { adminController } from "./controllers/admin-controller.js";


export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/addsurfspot", config: surfspotController.index },
  { method: "POST", path: "/addsurfspot", config: surfspotController.addsurfspot },
  { method: "GET", path: "/report", config: surfspotController.report },
  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } },

];