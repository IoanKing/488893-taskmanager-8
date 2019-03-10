import {createElement} from "./utils";

export default class Filter {
  constructor(collection) {
    this._title = collection.title;
    this._count = collection.count;

    this._element = null;
    this.status = {
      isActive: false
    };
  }

  get template() {
    return `
    <input type="radio"
      id="filter__${this._title}"
      class="filter__input visually-hidden"
      name="filter" ${(this._count === 0) ? `disabled` : ``}
      ${(this.status.isActive && this._count !== 0) ? `checked` : ``}/>
    <label for="filter__${this._title}" class="filter__label">${this._title.toUpperCase()}
      <span class="filter__${this._title}-count">${this._count}</span>
    </label>
    `.trim();
  }

  render() {
    this._element = createElement(this.template, true);
    return this._element;
  }

  unrender() {
    this._element = null;
  }

}
