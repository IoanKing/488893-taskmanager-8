import Selectors from "./selectors";
import Component from "./Component";

export default class Task extends Component {
  constructor(collection) {
    super();
    this._title = collection.title;
    this._picture = collection.picture;
    this._color = collection.color;
    this._repeatingDays = collection.repeatingDays;
    this._isDone = collection.isDone;
    this._isFavorite = collection.isFavorite;
    this._tags = collection.tags;
    this._dueDate = collection.dueDate;

    this._onEditButtonClick = this._onEditButtonClick.bind(this);
    this._element = null;
    this._status = {
      isEdit: false
    };
  }

  get _isDeadline() {
    return this._dueDate < new Date();
  }

  _isRepeated() {
    return Object.values(this._repeatingDays).some((it) => it === true);
  }

  _onEditButtonClick(evt) {
    if (typeof this._onEdit === `function`) {
      this._onEdit(evt);
    }
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  get template() {
    const newDate = new Date();
    newDate.setTime(this._dueDate);

    const month = newDate.toLocaleString(`en-US`, {month: `long`});
    const date = `${newDate.getDate()} ${month}`;
    const time = newDate.toLocaleString(`en-US`, {hour12: true, hour: `2-digit`, minute: `2-digit`});
    return `
    <article class="card card--${(this._color)} ${this._isRepeated() ? `card--repeat` : ``}${ this._isDeadline ? ` card--deadline` : ``}">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">
              edit
            </button>
            <button
              type="button"
              class="card__btn card__btn--archive ${!this._isDone ? `card__btn--disabled` : ``}"
            >
              archive
            </button>
            <button
              type="button"
              class="card__btn card__btn--favorites ${(!this._isFavorite) ? `card__btn--disabled` : ``}"
            >
              favorites
            </button>
          </div>

          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <label>
              <textarea
                class="card__text"
                placeholder="Start typing your text here..."
                name="text"
              >${this._title}</textarea>
            </label>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">no</span>
                </button>

                <fieldset class="card__date-deadline" ${(this._isDeadline) ? `disabled` : ``}>
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__date"
                      type="text"
                      placeholder="${date}"
                      name="date"
                      value="${date}"
                    />
                  </label>
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__time"
                      type="text"
                      placeholder="${time}"
                      name="time"
                      value="${time}"
                    />
                  </label>
                </fieldset>
              </div>

              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  ${(Array.from(this._tags).map((tag) => (`
                    <span class="card__hashtag-inner">
                      <input type="hidden" name="hashtag" value="${tag}" class="card__hashtag-hidden-input" />
                      <button type="button" class="card__hashtag-name">#${tag}</button>
                      <button type="button" class="card__hashtag-delete">delete</button>
                    </span>`.trim())))
                  .join(``)}
                </div>
              </div>
            </div>

            <label class="card__img-wrap ${(!this._picture) ? `card__img-wrap--empty` : ``}">
              <input
                type="file"
                class="card__img-input visually-hidden"
                name="img"
              />
              <img
                src="${(this._picture) ? this._picture : ``}"
                alt="task picture"
                class="card__img"
              />
            </label>
          </div>
        </div>
      </form>
    </article>
    `.trim();
  }

  addListener() {
    this._element.querySelector(`.${Selectors.CARD_EDIT_BTN}`)
      .addEventListener(`click`, this._onEditButtonClick);
  }

  removeListener() {
    this._element.querySelector(`.${Selectors.CARD_EDIT_BTN}`)
      .removeEventListener(`click`, this._onEditButtonClick);
  }

  update(collection) {
    this._title = collection.title;
    this._picture = collection.picture;
    this._color = collection.color;
    this._repeatingDays = collection.repeatingDays;
    this._tags = collection.tags;
    this._dueDate = collection.dueDate;
  }
}
