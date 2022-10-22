const PPTXGEN = require("pptxgenjs");

const mergeToPptFile = async (mergeData) => {
  const ppt = new PPTXGEN();
  ppt.layout = "LAYOUT_WIDE";

  for (let i = 0; i < mergeData.slides.length; i += 1) {
    const slide = ppt.addSlide();

    for (let y = 0; y < mergeData.slides[i].items.length; y += 1) {
      const slideBase = mergeData.slides[i].items[y];
      const slideContent = mergeData.slides[i].items[y].content;

      const slideContentsPosition = {
        x: ((slideBase.x / 1280) * 25) / 2.6,
        y: ((slideBase.y / 720) * 15) / 3.67,
        w: (slideBase.width * 0.0264583333) / 2.725,
        h: (slideBase.height * 0.0264583333) / 2.725,
      };

      const slideContentStyle = {
        bold: slideContent.isBold,
        italic: slideContent.isItalic,
        underline: slideContent.isUnderlined,
        fontface: slideContent.font,
        color: slideContent.color,
        fontSize: slideContent.size,
      };

      if (slideBase.type === "image") {
        slide.addImage({
          path: slideContent.src,
          ...slideContentsPosition,
        });
      }

      if (slideBase.type === "text") {
        slide.addText(slideContent.value, {
          ...(slideContent.backgroundColor && {
            fill: {
              color: slideContent.backgroundColor,
            },
          }),
          ...slideContentsPosition,
          ...slideContentStyle,
        });
      }
    }
  }
  const pptFile = await ppt.write("base64");
  return pptFile;
};

module.exports = mergeToPptFile;
