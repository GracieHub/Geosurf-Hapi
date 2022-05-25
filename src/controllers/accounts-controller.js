import bcrypt from "bcrypt";         // ADDED

import { db } from "../models/db.js";

const saltRounds = 10;                // ADDED

export const accountsController = {
  index: {
    auth: false,
    handler: function (request, h) {
      return h.view("Main", { title: "Welcome to GeoSurf" });
    },
  },
  showSignup: {
    auth: false,
    handler: function (request, h) {
      return h.view("Signup", { title: "Sign up for GeoSurf" });
    },
  },
  signup: {
    auth: false,
  /*  validate: {
      payload: UserSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("Signup", {title: "Sign up error", errors: error.details}).takeover().code(400);
      },
    }, */
    handler: async function (request, h) {
      const user = request.payload;
      user.password = await bcrypt.hash(user.password, saltRounds);    // ADDED
      await db.userStore.addUser(user);
      return h.redirect("/");
    },
  },
  showLogin: {
    auth: false,
    handler: function (request, h) {
      return h.view("Login", { title: "Login to GeoSUrf" });
    },
  },
  login: {
    auth: false,
 /*   validate: {
      payload: UserCredentialsSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("Login", { title: "Log in Geosurf", errors: error.details }).takeover().code(400);
      },
    }, */
    handler: async function (request, h) {
      const { email, password } = request.payload;
      const user = await db.userStore.getUserByEmail(email);
      const passwordsMatch = await bcrypt.compare(password, user.password);    // ADDED
      if (!user || !passwordsMatch) {                                          // EDITED
    //  if (!user || user.password !== password) {
        return h.redirect("/");
      }
      request.cookieAuth.set({ id: user._id });
      return h.redirect("/Addsurfspot");
    },
  },
  logout: {
    handler: function (request, h) {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },

  async validate(request, session) {
    const user = await db.userStore.getUserById(session.id);
    if (!user) {
      return { valid: false };
    }
    return { valid: true, credentials: user };
  },
 /* showAdmin: {
    auth: false,
    handler: function (request, h) {
      return h.view("admin", { title: "Admin for PlaceMark" });
    },
  }, */

};
