import {createElement} from "./utils";

export default class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error(`Can't instantiate BaseComponent, only concrete one.`);
    }

    this._element = null;
    this._state = {};
    this._muliplyBlocks = false;
  }

  get element() {
    return this._element;
  }

  get template() {
    throw new Error(`You have to define template.`);
  }

  render() {
    this._element = createElement(this.template, this._muliplyBlocks);
    this.addListener();
    return this._element;
  }

  unrender() {
    this.removeListener();
    this._element.remove();
    this._element = null;
  }

  addListener() {}

  removeListener() {}
}
