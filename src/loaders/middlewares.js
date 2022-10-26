const express = require("express");
const cors = require("cors");

const middlewareLoader = async (app) => {
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: false, limit: "50mb" }));
  app.use(cors());
};

module.exports = middlewareLoader;
