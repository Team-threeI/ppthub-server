const getOriginalSlideItems = (originalItems, mergedData) => {
  const itemsMap = new Map(Object.entries(mergedData.items));
  const mergedItems = originalItems.items.filter((item) => {
    if (
      (itemsMap.get(item.id).diff === "modified" &&
        !itemsMap.get(item.id).isChecked) ||
      (itemsMap.get(item.id).diff === "deleted" &&
        itemsMap.get(item.id).isChecked)
    ) {
      return item;
    }

    return null;
  });

  return mergedItems;
};

const getComparableSlideItems = (comparableItems, mergedData) => {
  const itemsMap = new Map(Object.entries(mergedData.items));
  const mergedItems = comparableItems.items.filter((item) => {
    if (
      (itemsMap.get(item.id).diff === "modified" &&
        itemsMap.get(item.id).isChecked) ||
      (itemsMap.get(item.id).diff === "added" &&
        itemsMap.get(item.id).isChecked)
    ) {
      return item;
    }

    return null;
  });

  return mergedItems;
};

const getMergedModifiedSlides = (
  modifiedOriginalSlides,
  modifiedComparableSlides,
) => {
  return modifiedOriginalSlides.map((slide) => {
    const tempSlide = slide;
    const MatchedSlide = modifiedComparableSlides.find(
      (comparableSlide) => slide.slideId === comparableSlide.slideId,
    );
    if (MatchedSlide) {
      tempSlide.items = [...slide.items, ...MatchedSlide.items];
      return tempSlide;
    }

    return slide;
  });
};

const getMergedPpt = (originalPpt, comparablePpt, mergeData) => {
  const mergeDataMap = new Map(Object.entries(mergeData));
  const mergedPpt = {
    slideWidth: originalPpt.slideWidth,
    slideHeight: originalPpt.slideHeight,
  };

  const modifiedOriginalSlides = originalPpt.slides
    .filter(
      (slide) => mergeDataMap.get(`${slide.data.slideId}`).diff === "modified",
    )
    .map((slide) => {
      const { slideId, items } = slide.data;
      return { slideId, items };
    });
  const modifiedComparableSlides = comparablePpt.slides
    .filter(
      (slide) => mergeDataMap.get(`${slide.data.slideId}`).diff === "modified",
    )
    .map((slide) => {
      const { slideId, items } = slide.data;
      return { slideId, items };
    });
  const addedSlides = [...originalPpt.slides, ...comparablePpt.slides]
    .filter((slide) => mergeDataMap.get(`${slide.data.slideId}`).isChecked)
    .map((slide) => {
      const { slideId, items } = slide.data;
      return { slideId, items };
    });

  for (let i = 0; i < modifiedOriginalSlides.length; i += 1) {
    const items = getOriginalSlideItems(
      modifiedOriginalSlides[i],
      mergeData[modifiedOriginalSlides[i].slideId],
    );
    modifiedOriginalSlides[i].items = items;
  }
  for (let i = 0; i < modifiedComparableSlides.length; i += 1) {
    const items = getComparableSlideItems(
      modifiedComparableSlides[i],
      mergeData[modifiedComparableSlides[i].slideId],
    );
    modifiedComparableSlides[i].items = items;
  }

  const mergedModifiedSlides = getMergedModifiedSlides(
    modifiedOriginalSlides,
    modifiedComparableSlides,
  );

  const slides = [...mergedModifiedSlides, ...addedSlides];
  mergedPpt.slides = slides;

  return mergedPpt;
};

module.exports = getMergedPpt;
