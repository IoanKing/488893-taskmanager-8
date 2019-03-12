import Task from "./task";
import mockdata from "./mock";
import TaskEdit from "./task-edit";

const MAX_TASK_ONPAGE = 20;

export default class TaskList {
  constructor(container) {
    this._container = container;
    this._element = this.getCollection(mockdata);
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

  getCollection(collection) {
    const tasks = [];
    collection.forEach((element) => {
      tasks.push(this.makeTask(element));
    });
    return tasks;
  }

  get element() {
    return this._element;
  }

  render() {
    this._container.innerHTML = ``;
    const partOfElements = this._element.slice(0, Math.min(MAX_TASK_ONPAGE, this._element.length));

    const fragment = document.createDocumentFragment();
    partOfElements.forEach((it) => {
      fragment.appendChild(it.render());
    });
    this._container.appendChild(fragment);
  }

  unrender() {
    this._element = null;
  }

  update(collection = mockdata) {
    this.unrender();
    this.getCollection(collection);
    this.render();
  }
}
