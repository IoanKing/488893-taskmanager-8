import Component from "./Component";

export default class Filter extends Component {
  constructor(collection) {
    super();
    this._title = collection.title;
    this._count = collection.count;

    this.status = {
      isActive: false
    };
    this._muliplyBlocks = true;
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
}
