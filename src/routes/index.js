const express = require("express");
const createError = require("http-errors");

const router = express.Router();

router.post("/api/parse", (req, res, next) => {
  try {
    const ppt = req.files.pptx;

    res.status(200).json();
  } catch {
    next(createError(500));
  }
});

module.exports = router;
