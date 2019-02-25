import Selector from "./selectors";
import getCardElement from "./card_template";
import getFilterElement from "./filter_template";
import {MAX_TASK_COUNT, getMockCollection} from "./mock";

const board = document.querySelector(`.${Selector.BOARD_TASKS}`);
const filterSection = document.querySelector(`.${Selector.FILTER_SECTION}`);

/**
 * Отрисовка фильтров.
 * @param {object} collection Коллекция обьектов "Фильтр".
 */
const renderFilterList = (collection) => {
  let isFirstElement = true;
  filterSection.innerHTML = ``;
  let fragment = ``;
  collection.forEach((element) => {
    fragment = fragment + getFilterElement(element, isFirstElement);
    isFirstElement = false;
  });
  filterSection.insertAdjacentHTML(`beforeend`, fragment);
};

/**
 * Отрисовка карточек задач.
 * @param {object} collection Коллекция обьектов "Карточки задач".
 */
const renderCardList = (collection) => {
  board.innerHTML = ``;
  let fragment = ``;
  collection.forEach((element) => {
    fragment = fragment + getCardElement(element);
  });
  board.insertAdjacentHTML(`beforeend`, fragment);
};

/**
 * Обновление списка карточек задач.
 * Генерирует новый случайный список задач и выполняет их отрисовку.
 * @param {number} maxCount Максимальное количество карточек задач.
 */
const refreshCollection = (maxCount = MAX_TASK_COUNT) => {
  const newRandomData = getMockCollection(maxCount);
  renderCardList(newRandomData);
};

export {renderFilterList, renderCardList, refreshCollection};
