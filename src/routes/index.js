const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({ result: "PPTHub" });
});

module.exports = router;
