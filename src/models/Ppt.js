const mongoose = require("mongoose");

const pptSchema = new mongoose.Schema(
  {
    downloadUrl: { type: String },
    slides: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PptSlide",
      },
    ],
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

pptSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

module.exports = mongoose.model("Ppt", pptSchema);
