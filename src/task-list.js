import Task from "./task";
import mockdata from "./mock";
import TaskEdit from "./task-edit";

const MAX_TASK_ONPAGE = 20;

export default class TaskList {
  constructor(container) {
    this._container = container;
    this._displayedTask = 0;
    this._element = null;
    this.getCollection(mockdata);
  }

  makeTask(element) {
    const newTask = new Task(element);
    const newTaskEdit = new TaskEdit(element);
    this._container.appendChild(newTask.render());
    newTask.onEdit = () => {
      newTaskEdit.render();
      this._container.replaceChild(newTaskEdit.element, newTask.element);
      newTask.unrender();
    };
    newTaskEdit.onSubmit = () => {
      newTask.render();
      this._container.replaceChild(newTask.element, newTaskEdit.element);
      newTaskEdit.unrender();
    };
    return newTask;
  }

  getCollection(collection) {
    this._element = [];
    collection.forEach((element)=>{
      this._element.push(this.makeTask(element));
    });
  }

  get element() {
    return this._element;
  }

  render() {
    this._container.innerHTML = ``;
    const partOfElements = this._element.slice(this._displayedTask, Math.min((this._displayedTask + MAX_TASK_ONPAGE), this._element.length));

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
