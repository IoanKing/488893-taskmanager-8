import Filter from "./filter";
import mockdata from "./mock";
import Selector from "./selectors";

export default class FilterList {
  constructor(container) {
    this._container = container;
    this._element = null;
    this._dataTask = mockdata;
  }

  _onDataFiltering(evt) {
    if (evt.target.classList.contains(Selector.FILTER_INPUT)) {
      const filter = evt.target.nextElementSibling.getAttribute(`for`).split(`__`).pop();
      this._dataTask = mockdata;

      switch (filter) {
        case `Today`:
          this._dataTask = Object.values(mockdata).filter((it) => {
            const dateBegin = new Date();
            dateBegin.setHours(0);
            dateBegin.setMinutes(0);
            dateBegin.setMilliseconds(0);
            const dateEnd = +dateBegin + 24 * 60 * 60 * 1000;
            return it.dueDate >= +dateBegin && it.dueDate <= dateEnd;
          });
          this._onTasksList.update(this._dataTask);
          break;
        case `Favirites`:
          this._dataTask = Object.values(mockdata).filter((it) => it.isFavorite);
          this._onTasksList.update(this._dataTask);
          break;
        case `Repeating`:
          this._dataTask = Object.values(mockdata).filter((it) => (Object.values(it.repeatingDays).some((it) => it === true)));
          this._onTasksList.update(this._dataTask);
          break;
        case `Tags`:
          this._dataTask = Object.values(mockdata).filter((it) => [...it.tags].length > 0);
          this._onTasksList.update(this._dataTask);
          break;
        case `Archive`:
          this._dataTask = Object.values(mockdata).filter((it) => it.isDone);
          this._onTasksList.update(this._dataTask);
          break;
      }
      this._onTasksList.update(this._dataTask);
    }
  }

  set onTasksList(obj) {
    this._onTasksList = obj;
  }

  get element() {
    return this._element;
  }

  get _collection() {
    const collection = [
      {
        title: `All`,
        count: mockdata.length,
      },
      {
        title: `Today`,
        count: Object.values(mockdata).reduce((sum, current) => {
          const dateBegin = new Date();
          dateBegin.setHours(0);
          dateBegin.setMinutes(0);
          dateBegin.setMilliseconds(0);
          const dateEnd = +dateBegin + 24 * 60 * 60 * 1000;
          return +sum + ((current.dueDate >= +dateBegin && current.dueDate <= dateEnd) ? 1 : 0);
        }, 0),
      },
      {
        title: `Favirites`,
        count: Object.values(mockdata).reduce((sum, current) => +sum + +current.isFavorite, 0),
      },
      {
        title: `Repeating`,
        count: Object.values(mockdata).reduce((sum, current) => +sum + ((Object.values(current.repeatingDays).some((it) => it === true) ? 1 : 0)), 0),
      },
      {
        title: `Tags`,
        count: Object.values(mockdata).reduce((sum, current) => {
          return +sum + (([...current.tags].length > 0) ? 1 : 0);
        }, 0),
      },
      {
        title: `Archive`,
        count: Object.values(mockdata).reduce((sum, current) => +sum + +current.isDone, 0),
      },
    ];
    return collection;
  }

  render() {
    this._element = this._container;
    this._element.innerHTML = ``;
    this._collection.forEach((it, i) => {
      const newFilter = new Filter(it);
      newFilter.onClick = this._onCallback;
      if (i === 0) {
        newFilter.status.isActive = true;
      }
      this._element.appendChild(newFilter.render());
    });
    this.bind();
    return this._element;
  }

  unrender() {
    this.unbind();
    this._element = null;
  }

  bind() {
    this._element.addEventListener(`click`, this._onDataFiltering.bind(this));
  }

  unbind() {
    this._element.removeEventListener(`click`, this._onDataFiltering.bind(this));
  }
}
