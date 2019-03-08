import {getRandomInt, getRandomElement} from "./utils";

const MAX_TASKS = 200;
const MAX_HASHTAG_COUNT = 3;

const TimeConstants = {
  MONTH_COUNT: 2,
  DAYS_COUNT: 7,
  HOUR_COUNTS: 24,
  MINUTES_COUNT: 60,
  SECONDS_COUNT: 60,
  MSECONDS_COUNT: 1000,
};

const MockData = {
  TITLES: [
    `Изучить теорию.`,
    `Сделать домашку.`,
    `Пройти интенсив на соточку.`,
    ``
  ],
  COLORS: [
    `black`,
    `yellow`,
    `blue`,
    `green`,
    `pink`
  ],
  TAGS: [
    `homework`,
    `theory`,
    `practice`,
    `intensive`,
    `keks`,
    `development`,
    `course`,
  ],
  BOOL: [true, false, false, false, false, false, false, false, false, false, false]
};
const BOOL_LENGTH = MockData.BOOL.length;

/**
 * Генерация карточки задачи.
 * @return {object} коллекция объектов.
 */
const getTask = () => ({
  title: MockData.TITLES[getRandomInt(0, MockData.TITLES.length)],
  dueDate: Date.now() + Math.floor(Math.random() * TimeConstants.DAYS_COUNT) * TimeConstants.HOUR_COUNTS * Math.floor(Math.random() * TimeConstants.MINUTES_COUNT) * Math.floor(Math.random() * TimeConstants.SECONDS_COUNT) * TimeConstants.MSECONDS_COUNT,
  tags: new Set(new Array(getRandomInt(0, MAX_HASHTAG_COUNT))
    .fill()
    .map(() => getRandomElement(MockData.TAGS))
  ),
  picture: `http://picsum.photos/100/100?r=${Math.random()}`,
  color: MockData.COLORS[getRandomInt(0, MockData.COLORS.length)],
  repeatingDays: {
    'mo': MockData.BOOL[getRandomInt(0, BOOL_LENGTH)],
    'tu': MockData.BOOL[getRandomInt(0, BOOL_LENGTH)],
    'we': MockData.BOOL[getRandomInt(0, BOOL_LENGTH)],
    'th': MockData.BOOL[getRandomInt(0, BOOL_LENGTH)],
    'fr': MockData.BOOL[getRandomInt(0, BOOL_LENGTH)],
    'sa': MockData.BOOL[getRandomInt(0, BOOL_LENGTH)],
    'su': MockData.BOOL[getRandomInt(0, BOOL_LENGTH)],
  },
  isFavorite: MockData.BOOL[getRandomInt(0, BOOL_LENGTH)],
  isDone: MockData.BOOL[getRandomInt(0, BOOL_LENGTH)],
});

/**
 * Генерация коллекции случайных карточек задач.
 * @param {number} countCollection количество карточек задач.
 * @return {object} коллекция объектов.
 */
const getMockCollection = () => {
  let collection = new Array(MAX_TASKS)
    .fill()
    .map(() => getTask());
  return collection;
};

const mockdata = getMockCollection();

export default mockdata;
