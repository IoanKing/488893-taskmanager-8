import {createElement} from "./utils";
import Selectors from "./selectors";

export default class TaskEdit {
  constructor(collection) {
    this._title = collection.title;
    this._picture = collection.picture;
    this._color = collection.color;
    this._repeatingDays = collection.repeatingDays;
    this._isDone = collection.isDone;
    this._isFavorite = collection.isFavorite;
    this._tags = collection.tags;
    this._dueDate = collection.dueDate;

    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._element = null;
    this._status = {
      isEdit: false
    };
  }

  get _isDeadline() {
    return this._dueDate < new Date();
  }

  _onSubmitButtonClick(evt) {
    if (typeof this._onSubmit === `function`) {
      this._onSubmit(evt);
    }
  }

  _isRepeated() {
    return Object.values(this._repeatingDays).some((it) => it === true);
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  get element() {
    return this._element;
  }

  get template() {
    const newDate = new Date();
    newDate.setTime(this._dueDate);

    const month = newDate.toLocaleString(`en-US`, {month: `long`});
    const date = `${newDate.getDate()} ${month}`;
    const time = newDate.toLocaleString(`en-US`, {hour12: true, hour: `2-digit`, minute: `2-digit`});
    return `
    <article class="card card--edit card--${(this._color)} ${this._isRepeated() ? `card--repeat` : ``}${ this._isDeadline ? ` card--deadline` : ``}">
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

                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">no</span>
                </button>

                <fieldset class="card__repeat-days">
                  <div class="card__repeat-days-inner">
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-mo-6"
                      name="repeat"
                      value="mo"
                      ${this._repeatingDays[`mo`] ? `checked` : ``}
                    />
                    <label class="card__repeat-day" for="repeat-mo-6"
                      >mo</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-tu-6"
                      name="repeat"
                      value="tu"
                      ${this._repeatingDays[`tu`] ? `checked` : ``}
                    />
                    <label class="card__repeat-day" for="repeat-tu-6"
                      >tu</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-we-6"
                      name="repeat"
                      value="we"
                      ${this._repeatingDays[`we`] ? `checked` : ``}
                    />
                    <label class="card__repeat-day" for="repeat-we-6"
                      >we</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-th-6"
                      name="repeat"
                      value="th"
                      ${this._repeatingDays[`th`] ? `checked` : ``}
                    />
                    <label class="card__repeat-day" for="repeat-th-6"
                      >th</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-fr-6"
                      name="repeat"
                      value="fr"
                      ${this._repeatingDays[`fr`] ? `checked` : ``}
                    />
                    <label class="card__repeat-day" for="repeat-fr-6"
                      >fr</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      name="repeat"
                      value="sa"
                      id="repeat-sa-6"
                      ${this._repeatingDays[`sa`] ? `checked` : ``}
                    />
                    <label class="card__repeat-day" for="repeat-sa-6"
                      >sa</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-su-6"
                      name="repeat"
                      value="su"
                      ${this._repeatingDays[`su`] ? `checked` : ``}
                    />
                    <label class="card__repeat-day" for="repeat-su-6"
                      >su</label
                    >
                  </div>
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

                <label>
                  <input
                    type="text"
                    class="card__hashtag-input"
                    name="hashtag-input"
                    placeholder="Type new hashtag here"
                  />
                </label>
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

            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
                <input
                  type="radio"
                  id="color-black-6"
                  class="card__color-input card__color-input--black visually-hidden"
                  name="color"
                  value="black"
                />
                <label
                  for="color-black-6"
                  class="card__color card__color--black"
                  >black</label
                >
                <input
                  type="radio"
                  id="color-yellow-6"
                  class="card__color-input card__color-input--yellow visually-hidden"
                  name="color"
                  value="yellow"
                />
                <label
                  for="color-yellow-6"
                  class="card__color card__color--yellow"
                  >yellow</label
                >
                <input
                  type="radio"
                  id="color-blue-6"
                  class="card__color-input card__color-input--blue visually-hidden"
                  name="color"
                  value="blue"
                />
                <label
                  for="color-blue-6"
                  class="card__color card__color--blue"
                  >blue</label
                >
                <input
                  type="radio"
                  id="color-green-6"
                  class="card__color-input card__color-input--green visually-hidden"
                  name="color"
                  value="green"
                  checked
                />
                <label
                  for="color-green-6"
                  class="card__color card__color--green"
                  >green</label
                >
                <input
                  type="radio"
                  id="color-pink-6"
                  class="card__color-input card__color-input--pink visually-hidden"
                  name="color"
                  value="pink"
                />
                <label
                  for="color-pink-6"
                  class="card__color card__color--pink"
                  >pink</label
                >
              </div>
            </div>
          </div>

          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>
    `.trim();
  }

  render() {
    this._element = createElement(this.template);
    this.addListener();
    return this._element;
  }

  unrender() {
    this.removeListener();
    this._element = null;
  }

  addListener() {
    this._element.querySelector(`.${Selectors.CARD_FROM}`)
      .addEventListener(`submit`, this._onSubmitButtonClick.bind(this));
  }

  removeListener() {
    this._element.querySelector(`.${Selectors.CARD_FROM}`)
      .removeEventListener(`submit`, this._onSubmitButtonClick.bind(this));
  }

  update() {
    this._element.classList.remove(Selectors.CARD_EDIT);
    if (this._status.isEdit) {
      this._element.classList.add(Selectors.CARD_EDIT);
    }
  }
}
