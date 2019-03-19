import Selector from "./selectors";
import FilterList from "./filter-list";
import TaskList from "./task-list";
import {MAX_COUNT} from "./utils";

const filterContainer = document.querySelector(`.${Selector.FILTER_SECTION}`);
const taskContainer = document.querySelector(`.${Selector.BOARD_TASKS}`);

const filterDefault = (collection) => {
  return Object.values(collection).slice(0, Math.min(MAX_COUNT, collection.length));
};

/**
 * Инициализация скриптов для сайта.
 *  Запускает фунукцию отрисовки фильтров;
 *  Запускает функцию орисовки карточек задач;
 */
const init = () => {
  const filterList = new FilterList(filterContainer);
  const taskList = new TaskList(taskContainer);
  filterList.onTasksList = taskList;
  filterList.render();

  taskList.Filter = filterDefault;
  taskList.render();
};

init();
