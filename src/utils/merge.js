const DIFF_TYPES = require("../config/diffTypes");

const getSlideItems = (originalItems, mergedData, pptType) => {
  const mergedItemsData = mergedData.items;
  const mergedItems = originalItems.items.filter((item) => {
    if (
      (pptType === "original" &&
        mergedItemsData[item.id].diff === DIFF_TYPES.MODIFIED &&
        !mergedItemsData[item.id].isChecked) ||
      (pptType === "original" &&
        mergedItemsData[item.id].diff === DIFF_TYPES.DELETED &&
        mergedItemsData[item.id].isChecked)
    ) {
      return true;
    }

    if (
      (pptType === "comparison" &&
        mergedItemsData[item.id].diff === DIFF_TYPES.MODIFIED &&
        mergedItemsData[item.id].isChecked) ||
      (pptType === "comparison" &&
        mergedItemsData[item.id].diff === DIFF_TYPES.ADDED &&
        mergedItemsData[item.id].isChecked)
    ) {
      return true;
    }

    return false;
  });

  return mergedItems;
};

const getMergedModifiedSlides = (
  modifiedOriginalSlides,
  modifiedComparableSlides,
) => {
  return modifiedOriginalSlides.map((slide) => {
    const tempSlide = slide;
    const matchedSlide = modifiedComparableSlides.find(
      (comparableSlide) => slide.slideId === comparableSlide.slideId,
    );
    if (matchedSlide) {
      tempSlide.items = [...slide.items, ...matchedSlide.items];
      return tempSlide;
    }

    return slide;
  });
};

const getModifiedSlides = (slides, mergeData) => {
  return slides
    .filter(
      (slide) => mergeData[slide.data.slideId].diff === DIFF_TYPES.MODIFIED,
    )
    .map((slide) => {
      const { slideId, items } = slide.data;
      return { slideId, items };
    });
};

const getMergedPpt = (originalPpt, comparablePpt, mergeData) => {
  const modifiedOriginalSlides = getModifiedSlides(
    originalPpt.slides,
    mergeData,
  );
  const modifiedComparableSlides = getModifiedSlides(
    comparablePpt.slides,
    mergeData,
  );
  const addedSlides = [...originalPpt.slides, ...comparablePpt.slides]
    .filter(
      (slide) =>
        !mergeData[slide.data.slideId] ||
        mergeData[slide.data.slideId].diff === DIFF_TYPES.NONE ||
        mergeData[slide.data.slideId].isChecked,
    )
    .map((slide) => {
      const { slideId, items } = slide.data;
      return { slideId, items };
    });

  modifiedOriginalSlides.map((slide) => {
    const pptType = "original";
    const items = getSlideItems(slide, mergeData[slide.slideId], pptType);
    return Object.assign(slide, { items });
  });
  modifiedComparableSlides.map((slide) => {
    const pptType = "comparison";
    const items = getSlideItems(slide, mergeData[slide.slideId], pptType);
    return Object.assign(slide, { items });
  });

  const mergedModifiedSlides = getMergedModifiedSlides(
    modifiedOriginalSlides,
    modifiedComparableSlides,
  );

  const slides = [...mergedModifiedSlides, ...addedSlides];

  const mergedPpt = {
    slideWidth: originalPpt.slideWidth,
    slideHeight: originalPpt.slideHeight,
    slides,
  };

  return mergedPpt;
};

module.exports = getMergedPpt;
