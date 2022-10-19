const express = require("express");
const createError = require("http-errors");

const Ppt = require("../models/Ppt");
const PptSlide = require("../models/PptSlide");

const router = express.Router();

router.post("/api/ppt/save", async (req, res, next) => {
  try {
    const { pptData } = req.body;
    const ppt = new Ppt();
    await ppt.save();

    pptData.slides.forEach(async (slide) => {
      const data = await PptSlide.create({ data: slide });
      await Ppt.findByIdAndUpdate(
        { _id: ppt._id },
        { $push: { slides: data._id } },
      );
    });

    res.status(200).json(ppt._id);
  } catch {
    next(createError(500));
  }
});

module.exports = router;
