const saveMockData = {
  fileName: "MockPpt",
  pptData: {
    slideWidth: 1280,
    slideHeight: 720,
    slides: [
      {
        slide1: "Slide 5",
        items: [
          {
            type: "text",
            order: 1,
            itemId: "Text 0",
            width: 306.5244094488189,
            height: 38.77501312335958,
            x: 784.5517060367455,
            y: 332.13795275590553,
            content: {
              value: "변경이 일어나는 text item 2",
              isBold: true,
              isItalic: true,
              isUnderlined: false,
              fontColor: "#000000",
              backgroundColor: null,
              align: "left",
              size: 18,
            },
          },
          {
            type: "text",
            order: 3,
            itemId: "Text 1",
            width: 477.8479790026247,
            height: 38.77501312335958,
            x: 328.82761154855643,
            y: 195.3103412073491,
            content: {
              value: "변경이 일어나는 text item 1 (변경되는 버전)",
              isBold: true,
              isItalic: true,
              isUnderlined: false,
              fontColor: "#000000",
              backgroundColor: null,
              align: "left",
              size: 18,
            },
          },
        ],
      },
    ],
  },
};

const originalPptId = "635a5f415f2ae61901638adb";

const comparablePptId = "635a5e00e03c75d80b8d6234";

const slideOrderList = ["Slide 2", "Slide 5"];

const mergeData = {
  undefined: {
    items: { 그림이: [Object], "Text 1": [Object], "Text 0": [Object] },
    diff: "modified",
  },
};

const mergedPptId = "635a6ce786c28d514f6c160c";

module.exports = {
  saveMockData,
  slideOrderList,
  originalPptId,
  comparablePptId,
  mergeData,
  mergedPptId,
};
