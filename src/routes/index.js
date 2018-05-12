const express = require("express");
const adventureRoutes = require("./adventure");
const destRoutes = require("./dest");
const logRoutes = require("./login");
const registerRoutes = require("./register");
const profileRoutes = require("./profile");

const constructorMethod = app => { 

  app.use("/adventure", adventureRoutes);
  app.use("/destinations", destRoutes);
  app.use("/login", logRoutes);
  app.use("/register", registerRoutes);
  app.use("/profile", profileRoutes);
  app.use("/", (req, res) => {
    res.render("splash");
  });
  

  app.use("*", (req, res) => {
    res.redirect("layouts/main");
  });
};

module.exports = constructorMethod;
