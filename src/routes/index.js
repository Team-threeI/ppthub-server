const express = require("express");
const createError = require("http-errors");

const Ppt = require("../models/Ppt");
const PptSlide = require("../models/PptSlide");

const router = express.Router();

router.post("/api/ppt/save", async (req, res, next) => {
  try {
    const { pptData } = req.body;
    const ppt = new Ppt({
      slideWidth: pptData.slideWidth,
      slideHeight: pptData.slideHeight,
    });
    await ppt.save();

    pptData.slides.forEach(async (slideData) => {
      const slide = await PptSlide.create({ data: slideData });
      await Ppt.findByIdAndUpdate(ppt._id, { $push: { slides: slide._id } });
    });

    res.status(200).json(ppt._id);
  } catch {
    next(createError(500));
  }
});

module.exports = router;
