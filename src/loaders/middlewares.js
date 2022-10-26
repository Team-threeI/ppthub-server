const express = require("express");
const cors = require("cors");
const CONFIG = require("../config/constants");

const middlewareLoader = async (app) => {
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: false, limit: "50mb" }));
  app.use(cors({ origin: `${CONFIG.CLIENT_URL}`, credentials: true }));
};

module.exports = middlewareLoader;
