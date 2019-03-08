import Filter from "./filter";
import mockdata from "./mock";

export default class FilterList {
  constructor() {
    this._element = null;
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

  createFilterList() {
    this._element = [];
    this._collection.forEach((it) => {
      this._element.push(new Filter(it));
    });
  }

  render() {
    this.createFilterList();

    const fragment = document.createDocumentFragment();
    this._element.forEach((it, i) => {
      if (i === 0) {
        it.status.isActive = true;
      }
      fragment.appendChild(it.render());
    });
    return fragment;
  }

  unrender() {
    this._element = null;
  }
}
