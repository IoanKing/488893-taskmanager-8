const MIN_COUNT = 0;
const MAX_COUNT = 30;

const DateGenerator = {
  MONTH_NAMES: [`January`, `February`, `March`, `April`, `May`, `June`, `Jule`, `August`, `September`, `October`, `November`, `December`],
  takeMinutes: (date) => `${(date.getMinutes() < 10) ? `0${date.getMinutes()}` : date.getMinutes()}`,
  takeTime: (date) => `${(date.getHours() > 12) ? `${date.getHours() - 12}:${DateGenerator.takeMinutes(date)} PM` : `${date.getHours()}:${DateGenerator.takeMinutes(date)} AM`}`,
  takeDate: (date) => new Date(date)
};

/**
 * Генерация случайного числа на заданном интервале.
 * @param {number} min минимальное значение интервала.
 * @param {number} max максимальнео значение интервала.
 * @return {number} сгенерированное число.
 */
const getRandomInt = (min = MIN_COUNT, max = MAX_COUNT) => Math.floor(Math.random() * (max - min)) + min;

/**
 * Выбор случайного элемента из коллекции объектов.
 * @param {object} collection коллекция объектов.
 * @return {object} элемент коллекции объектов.
 */
const getRandomElement = (collection) => collection[getRandomInt(0, collection.length)];

export {getRandomInt, getRandomElement, DateGenerator};
