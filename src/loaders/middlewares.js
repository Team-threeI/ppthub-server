const express = require("express");

const middlewareLoader = async (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
};

module.exports = middlewareLoader;
