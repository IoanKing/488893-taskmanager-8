import Selector from "./selectors";
import FilterList from "./filter-list";
import TaskList from "./task-list";

/**
 * Инициализация скриптов для сайта.
 *  Запускает фнукцию отрисовки фильтров;
 *  Запускает функцию генерации случайной коллекции задач;
 *  Запускает функцию орисовки карточек задач;
 *  Запускает обработкик обработки клика на фильтр.
 */
const init = () => {
  const filterContainer = document.querySelector(`.${Selector.FILTER_SECTION}`);
  const filterList = new FilterList();
  filterContainer.appendChild(filterList.render());

  const taskContainer = document.querySelector(`.${Selector.BOARD_TASKS}`);
  const taskList = new TaskList(taskContainer);
  taskList.render();
};

init();
