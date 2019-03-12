import Selector from "./selectors";
import FilterList from "./filter-list";
import TaskList from "./task-list";

/**
 * Инициализация скриптов для сайта.
 *  Запускает фунукцию отрисовки фильтров;
 *  Запускает функцию орисовки карточек задач;
 */
const init = () => {
  const filterContainer = document.querySelector(`.${Selector.FILTER_SECTION}`);
  const filterList = new FilterList(filterContainer);
  filterList.render();

  const taskContainer = document.querySelector(`.${Selector.BOARD_TASKS}`);
  const taskList = new TaskList(taskContainer);
  taskList.render();

  filterList.onTasksList = taskList;
};

init();
