const mongoose = require("mongoose");

const pptSchema = new mongoose.Schema({
  downloadUrl: { type: String },
  slides: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PptSlide",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400,
    required: true,
  },
});

module.exports = mongoose.model("Ppt", pptSchema);
