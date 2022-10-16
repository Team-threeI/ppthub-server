const mongoose = require("mongoose");

const mongooseLoader = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });

    console.info("Connected to database...");
  } catch (err) {
    console.error("connection error");
  }
};

module.exports = mongooseLoader;
