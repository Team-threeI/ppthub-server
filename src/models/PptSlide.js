const mongoose = require("mongoose");

const pptSlideSchema = new mongoose.Schema({
  data: { type: Object, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400,
    required: true,
  },
});

module.exports = mongoose.model("PptSlide", pptSlideSchema);
