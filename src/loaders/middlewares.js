const express = require("express");
const fileupload = require("express-fileupload");

const middlewareLoader = async (app) => {
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: false, limit: "10mb" }));
  app.use(fileupload());
};

module.exports = middlewareLoader;
