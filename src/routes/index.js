const express = require("express");
const createError = require("http-errors");

const Ppt = require("../models/Ppt");
const PptSlide = require("../models/PptSlide");
const { uploadPpt } = require("../services/pptServices");
const createPpt = require("../utils/createPpt");
const differ = require("../utils/differ");
const getMergedPpt = require("../utils/merge");

const router = express.Router();

router.post("/api/ppts/save", async (req, res, next) => {
  try {
    const { pptData, fileName } = req.body;
    const ppt = new Ppt({
      fileName,
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

router.post("/api/ppts/compare", async (req, res, next) => {
  try {
    const { originalPptId, comparablePptId } = req.body;
    const originalPpt = await Ppt.findById(originalPptId)
      .populate("slides")
      .lean();
    const comparablePpt = await Ppt.findById(comparablePptId)
      .populate("slides")
      .lean();

    if (!originalPpt || !comparablePpt) {
      next(createError(500));
    }

    const diffData = differ(originalPpt, comparablePpt);

    res.status(200).json(diffData);
  } catch {
    next(createError(500));
  }
});

router.post("/api/ppts/merge", async (req, res, next) => {
  try {
    const { originalPptId, comparablePptId, mergeData } = req.body;
    const originalPpt = await Ppt.findById(originalPptId)
      .populate("slides")
      .lean();
    const comparablePpt = await Ppt.findById(comparablePptId)
      .populate("slides")
      .lean();
    const mergedPptData = getMergedPpt(originalPpt, comparablePpt, mergeData);
    const createdPpt = createPpt(mergedPptData);
    const downloadUrl = await uploadPpt(createdPpt, mergedPptData.fileName);
    const ppt = new Ppt({
      slideWidth: mergedPptData.slideWidth,
      slideHeight: mergedPptData.slideHeight,
      fileName: mergedPptData.fileName,
      downloadUrl,
    });

    await ppt.save();

    mergedPptData.slides.forEach(async (slideData) => {
      const slide = await PptSlide.create({ data: slideData });
      await Ppt.findByIdAndUpdate(ppt._id, { $push: { slides: slide._id } });
    });

    res.status(200).json(ppt._id);
  } catch {
    next(createError(500));
  }
});

module.exports = router;
