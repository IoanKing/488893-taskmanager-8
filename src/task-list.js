import Task from "./task";
import mockdata from "./mock";
import TaskEdit from "./task-edit";

export default class TaskList {
  constructor() {
    this._collection = this._getCollection(mockdata);
    this._element = null;
    this._onFilterData = Object.values(this._collection);
  }

  makeTask(element) {
    const newTask = new Task(element);
    newTask.onEdit = (evtEdit) => {
      evtEdit.preventDefault();

      const newTaskEdit = new TaskEdit(element);

      newTaskEdit.render();
      this._container.replaceChild(newTaskEdit.element, newTask.element);
      newTask.unrender();

      newTaskEdit.onSubmit = (evtSubmit) => {
        evtSubmit.preventDefault();
        newTask.render();
        this._container.replaceChild(newTask.element, newTaskEdit.element);
        newTaskEdit.unrender();
      };
    };
    return newTask;
  }

  _getCollection(collection) {
    const tasks = [];
    collection.forEach((element) => {
      tasks.push(this.makeTask(element));
    });
    return tasks;
  }

  set onClick(fn) {
    this._collection.forEach((element) => {
      element.onClick = fn;
    });
  }

  set Filter(fn) {
    this._onFilter = fn;
  }

  set defaultContainer(obj) {
    this._element = obj;
  }

  get element() {
    return this._element;
  }

  get collection() {
    return this._collection;
  }

  render(container = this._element) {
    container.innerHTML = ``;
    const partOfElements = this._onFilter(this._collection);

    const fragment = document.createDocumentFragment();
    partOfElements.forEach((it) => {
      fragment.appendChild(it.render());
    });
    container.appendChild(fragment);
  }

  unrender() {
    this._onFilterData = Object.values(this._collection);
  }
}
