const express = require("express");
const cookieParser = require("cookie-parser");

const middlewareLoader = async (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
};

module.exports = middlewareLoader;
