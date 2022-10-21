const cron = require("node-cron");
const Ppt = require("../models/Ppt");
const PptSlide = require("../models/PptSlide");

const dbSchedulerLoader = async () => {
  const yesterDay = new Date(new Date().getTime() + 1000 * 60 * 60 * 9);
  yesterDay.setDate(yesterDay.getDate() - 1);

  cron.schedule("0 0 0 * * *", async () => {
    await Ppt.deleteMany({
      createdAt: {
        $lte: yesterDay.toISOString(),
      },
    });
    await PptSlide.deleteMany({
      createdAt: {
        $lte: yesterDay.toISOString(),
      },
    });
  });
};

module.exports = dbSchedulerLoader;
