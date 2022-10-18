const express = require("express");

const router = express.Router();

router.post("/api/parse", (req, res, next) => {
  try {
    const ppt = req.files.pptx;

    res.status(200).json();
  } catch {
    res.status(500).json();
  }
});

module.exports = router;
