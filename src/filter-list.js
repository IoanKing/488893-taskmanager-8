import Filter from "./filter";
import mockdata from "./mock";
import Selector from "./selectors";
import {MAX_COUNT} from "./utils";

export default class FilterList {
  constructor(container) {
    this._container = container;
    this._element = null;
    this._dataCollection = null;

    this._onDataFiltering = this._onDataFiltering.bind(this);
  }

  _onDataFiltering(evt) {
    if (evt.target.classList.contains(Selector.FILTER_LABEL)) {
      const filter = evt.target.getAttribute(`for`).split(`__`).pop();

      const filterDefault = (collection) => {
        return Object.values(collection).slice(0, Math.min(MAX_COUNT, collection.length));
      };

      const filterToday = (collection) => {
        return Object.values(collection).filter((it) => {
          const dateBegin = new Date();
          dateBegin.setHours(0);
          dateBegin.setMinutes(0);
          dateBegin.setMilliseconds(0);
          const dateEnd = +dateBegin + 24 * 60 * 60 * 1000;
          return it._dueDate >= +dateBegin && it._dueDate <= dateEnd;
        }).slice(0, Math.min(MAX_COUNT, collection.length));
      };

      const filterFavorites = (collection) => {
        return Object.values(collection).filter((it) => it._isFavorite).slice(0, Math.min(MAX_COUNT, collection.length));
      };

      const filterRepeating = (collection) => {
        return Object.values(collection).filter((it) => (Object.values(it._repeatingDays).some((element) => element === true))).slice(0, Math.min(MAX_COUNT, collection.length));
      };

      const filterTags = (collection) => {
        return Object.values(collection).filter((it) => [...it._tags].length > 0).slice(0, Math.min(MAX_COUNT, collection.length));
      };

      const filterArchive = (collection) => {
        return Object.values(collection).filter((it) => it._isDone).slice(0, Math.min(MAX_COUNT, collection.length));
      };

      switch (filter) {
        case `Today`:
          this._onTasksList.Filter = filterToday;
          this._onTasksList.render();
          break;
        case `Favirites`:
          this._onTasksList.Filter = filterFavorites;
          this._onTasksList.render();
          break;
        case `Repeating`:
          this._onTasksList.Filter = filterRepeating;
          this._onTasksList.render();
          break;
        case `Tags`:
          this._onTasksList.Filter = filterTags;
          this._onTasksList.render();
          break;
        case `Archive`:
          this._onTasksList.Filter = filterArchive;
          this._onTasksList.render();
          break;
        default:
          this._onTasksList.Filter = filterDefault;
          this._onTasksList.render();
          break;
      }
    }
  }

  set onTasksList(obj) {
    this._onTasksList = obj;
    this._dataCollection = this._getCollection();
  }

  get element() {
    return this._element;
  }

  _getCollection() {
    const Tasks = [];
    this._collection.forEach((element) => {
      Tasks.push(new Filter(element));
    });
    return Tasks;
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

  render(container) {
    this._element = container;
    this._element.innerHTML = ``;
    this._collection.forEach((it, i) => {
      const newFilter = new Filter(it);
      newFilter.onClick = this._onCallback;
      if (i === 0) {
        newFilter.status.isActive = true;
      }
      this._element.insertAdjacentHTML(`beforeend`, newFilter.render());
    });
    this.addListener();
  }

  unrender() {
    this.removeListener();
    this._element = null;
  }

  addListener() {
    this._element.addEventListener(`click`, this._onDataFiltering);
  }

  removeListener() {
    this._element.removeEventListener(`click`, this._onDataFiltering);
  }
}
