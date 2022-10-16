const mongoose = require("mongoose");

const pptSchema = new mongoose.Schema({
  pptId: { type: String, required: true },
  name: { type: String, required: true },
  data: { type: Object, required: true },
  downloadUrl: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400,
    required: true,
  },
});

module.exports = mongoose.model("Ppt", pptSchema);
