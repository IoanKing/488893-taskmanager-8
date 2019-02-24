import {getRandomInt, getRandomElement} from "./utils";

const MAX_TASK_COUNT = 20;
const DEFAULT_TASK_COUNT = 7;
const MAX_HASHTAG_COUNT = 4;

const MockData = {
  COLORS: [`black`, `yellow`, `blue`, `green`, `pink`],
  FAVORITE: [true, false],
  REPEAT: [true, false],
  TEXTS: [`This is example of new task, you can add picture, set date and time, add tags.`,
    `It is example of repeating task. It marks by wave.`,
    `This is card with missing deadline.`,
    `Here is a card with filled data.`,
    ``],
  DEADLINE: [true, false],
  DATES: [`23 september`, `10 februaly`, `23 februaly`, `10 jule`, `13 april`],
  TIMES: [`11:15 PM`, `10:00 AM`, `6:25 PM`, `0:01 AM`, `1:30 PM`, ``],
  IMAGES: [`img/sample-img.jpg`, ``],
  HASHTAGS: [`#repeat`, `#cinema`, `#entertaiment`, `#testing`]
};

const FilterMockData = [
  {
    title: `all`,
    count: 7,
  },
  {
    title: `overdue`,
    count: 0,
  },
  {
    title: `today`,
    count: 0,
  },
  {
    title: `favorites`,
    count: 7,
  },
  {
    title: `repeating`,
    count: 2,
  },
  {
    title: `tags`,
    count: 6,
  },
  {
    title: `archive`,
    count: 115,
  },
];

/**
 * Генерация коллекции случайных карточек задач.
 * @param {number} countCollection количество карточек задач.
 * @return {object} коллекция объектов.
 */
const getMockCollection = (countCollection) => {
  const collection = [];
  for (let i = 0; i < countCollection; i++) {
    const countHashtag = getRandomInt(0, MAX_HASHTAG_COUNT);
    const newHashtags = [];
    const hashtagData = MockData.HASHTAGS.slice();
    for (let j = 0; j < Math.min(countHashtag, hashtagData.length); j++) {
      const tagIndex = getRandomInt(0, hashtagData.length);
      newHashtags.push(hashtagData[tagIndex]);
      hashtagData.splice(tagIndex, 1);
    }
    const newElement = {
      color: getRandomElement(MockData.COLORS),
      isFavorite: getRandomElement(MockData.FAVORITE),
      isRepeat: getRandomElement(MockData.REPEAT),
      text: getRandomElement(MockData.TEXTS),
      isDeadline: getRandomElement(MockData.DEADLINE),
      data: getRandomElement(MockData.DATES),
      time: getRandomElement(MockData.TIMES),
      image: getRandomElement(MockData.IMAGES),
      hashtags: newHashtags,
    };
    collection.push(newElement);
  }
  return collection;
};

export {MAX_TASK_COUNT, DEFAULT_TASK_COUNT, MAX_HASHTAG_COUNT, MockData, FilterMockData, getMockCollection};
