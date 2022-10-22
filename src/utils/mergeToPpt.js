const PPTXGEN = require("pptxgenjs");

const mergeToPptFile = async (mergeData) => {
  const slidesArray = mergeData.slides;
  const ppt = new PPTXGEN();

  for (let i = 0; i < slidesArray.length; i += 1) {
    const slide = ppt.addSlide();
    const slideItems = slidesArray[i].items;

    for (let y = 0; y < slideItems.length; y += 1) {
      const slideBase = slideItems[y];
      const slideContent = slideItems[y].content;

      if (slideBase.type === "image") {
        slide.addImage({
          path: slideContent.src,
          x: ((slideBase.x / 1280) * 25) / 2.6,
          y: ((slideBase.y / 720) * 15) / 3.67,
          w: (slideBase.width * 0.0264583333) / 2.725,
          h: (slideBase.height * 0.0264583333) / 2.725,
        });
      }

      if (slideBase.type === "text") {
        if (!slideContent.backgroundColor) {
          slide.addText(slideContent.value, {
            x: ((slideBase.x / 1280) * 25) / 2.6,
            y: ((slideBase.y / 720) * 15) / 3.67,
            w: (slideBase.width * 0.0264583333) / 2.725,
            h: (slideBase.height * 0.0264583333) / 2.725,
            bold: slideContent.isBold,
            italic: slideContent.isItalic,
            underline: slideContent.isUnderlined,
            fontface: slideContent.font,
            color: slideContent.color,
            fontSize: slideContent.size,
          });
        }

        if (slideContent.backgroundColor) {
          slide.addText(slideContent.value, {
            x: ((slideBase.x / 1280) * 25) / 2.6,
            y: ((slideBase.y / 720) * 15) / 3.67,
            w: (slideBase.width * 0.0264583333) / 2.725,
            h: (slideBase.height * 0.0264583333) / 2.725,
            bold: slideContent.isBold,
            italic: slideContent.isItalic,
            underline: slideContent.isUnderlined,
            fontface: slideContent.font,
            color: slideContent.color,
            fontSize: slideContent.size,
            fill: { color: slideContent.backgroundColor },
          });
        }
      }
    }
  }
  const pptFile = await ppt.write("base64");
  return pptFile;
};

module.exports = mergeToPptFile;
