import Task from "./task";
import mockdata from "./mock";
import TaskEdit from "./task-edit";

export default class TaskList {
  constructor(container) {
    this._container = container;
    this._collection = this._getCollection(mockdata);
    this._onFilterData = Object.values(this._collection);
  }

  makeTask(task) {
    const newTask = new Task(task);
    newTask.onEdit = (evtEdit) => {
      evtEdit.preventDefault();

      const newTaskEdit = new TaskEdit(task);

      newTaskEdit.render();
      this._container.replaceChild(newTaskEdit.element, newTask.element);
      newTask.unrender();

      newTaskEdit.onSubmit = (newObject) => {
        task.title = newObject.title;
        task.tags = newObject.tags;
        task.color = newObject.color;
        task.repeatingDays = newObject.repeatingDays;
        task.dueDate = newObject.dueDate;

        newTask.update(task);
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

  get element() {
    return this._element;
  }

  get collection() {
    return this._collection;
  }

  render() {
    this._container.innerHTML = ``;
    const partOfElements = this._onFilter(this._collection);

    const fragment = document.createDocumentFragment();
    partOfElements.forEach((it) => {
      fragment.appendChild(it.render());
    });
    this._container.appendChild(fragment);
  }

  unrender() {
    this._onFilterData = Object.values(this._collection);
    this._container.innerHTML = ``;
  }
}
