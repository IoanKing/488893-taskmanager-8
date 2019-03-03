import {getRandomInt, getRandomElement} from "./utils";

const MAX_TASK_COUNT = 20;
const DEFAULT_TASK_COUNT = 7;
const MAX_HASHTAG_COUNT = 3;

const MockData = {
  TITLE: [
    `Изучить теорию.`,
    `Сделать домашку.`,
    `Пройти интенсив на соточку.`,
    ``
  ],
  COLOR: [
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
const BOOL_LNGTH = MockData.BOOL.length;

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
 * Генерация карточки задачи.
 * @return {object} коллекция объектов.
 */
const getTask = () => ({
  title: MockData.TITLE[getRandomInt(0, MockData.TITLE.length)],
  dueDate: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * Math.floor(Math.random() * 60) * Math.floor(Math.random() * 60) * 1000,
  tags: new Set(new Array(getRandomInt(0, MAX_HASHTAG_COUNT))
    .fill()
    .map(() => getRandomElement(MockData.TAGS))
  ),
  picture: `http://picsum.photos/100/100?r=${Math.random()}`,
  color: MockData.COLOR[getRandomInt(0, MockData.COLOR.length)],
  repeatingDays: {
    'mo': MockData.BOOL[getRandomInt(0, BOOL_LNGTH)],
    'tu': MockData.BOOL[getRandomInt(0, BOOL_LNGTH)],
    'we': MockData.BOOL[getRandomInt(0, BOOL_LNGTH)],
    'th': MockData.BOOL[getRandomInt(0, BOOL_LNGTH)],
    'fr': MockData.BOOL[getRandomInt(0, BOOL_LNGTH)],
    'sa': MockData.BOOL[getRandomInt(0, BOOL_LNGTH)],
    'su': MockData.BOOL[getRandomInt(0, BOOL_LNGTH)],
  },
  isFavorite: MockData.BOOL[getRandomInt(0, BOOL_LNGTH)],
  isDone: MockData.BOOL[getRandomInt(0, BOOL_LNGTH)],
});

/**
 * Генерация коллекции случайных карточек задач.
 * @param {number} countCollection количество карточек задач.
 * @return {object} коллекция объектов.
 */
const getMockCollection = (countCollection) => {
  let collection = new Array(countCollection)
    .fill()
    .map(() => getTask());
  return collection;
};

export {MAX_TASK_COUNT, DEFAULT_TASK_COUNT, MAX_HASHTAG_COUNT, FilterMockData, getMockCollection};
