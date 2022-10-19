const express = require("express");

const middlewareLoader = async (app) => {
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: false, limit: "50mb" }));
};

module.exports = middlewareLoader;
