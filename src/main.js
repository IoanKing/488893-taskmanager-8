import Selector from "./selectors";
import {renderFilterList, renderCardList, refreshCollection} from "./render";
import {DEFAULT_TASK_COUNT, MAX_TASK_COUNT, getMockCollection, FilterMockData} from "./mock";

const filterSection = document.querySelector(`.${Selector.FILTER_SECTION}`);

/**
 * Обработчик события клика на активный фильтр - запускает обновление списка карточек задач.
 * @param {object} evt объект события Event - нажатия клика.
 */
const onFilterClick = (evt) => {
  if (evt.target.classList.contains(`${Selector.FILTER_INPUT}`)) {
    const filterCount = evt.target.nextElementSibling.querySelector(`span`).textContent;
    refreshCollection(Math.min(+filterCount, MAX_TASK_COUNT));
  }
};

/**
 * Инициализация скриптов для сайта.
 *  Запускает фнукцию отрисовки фильтров;
 *  Запускает функцию генерации случайной коллекции задач;
 *  Запускает функцию орисовки карточек задач;
 *  Запускает обработкик обработки клика на фильтр.
 */
const init = () => {
  renderFilterList(FilterMockData);
  const randomData = getMockCollection(DEFAULT_TASK_COUNT);
  renderCardList(randomData);
  filterSection.addEventListener(`click`, onFilterClick);
};

init();
