import Selectors from "./selectors";
import Component from "./Component";
import flatpickr from 'flatpickr';
import moment from "moment";

export default class TaskEdit extends Component {
  constructor(collection) {
    super();
    this._title = collection.title;
    this._picture = collection.picture;
    this._color = collection.color;
    this._repeatingDays = collection.repeatingDays;
    this._tags = collection.tags;
    this._dueDate = (collection.dueDate) ? collection.dueDate : new Date();

    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._onChangeDate = this._onChangeDate.bind(this);
    this._onChangeRepeated = this._onChangeRepeated.bind(this);

    this._state.isDate = (collection.dueDate) ? true : false;
    this._state.isRepeated = Object.values(this._repeatingDays).some((it) => it === true);

    this._status = {
      isEdit: false
    };
  }

  _onDateChange(objDate) {
    this._dueDate = moment(this._dueDate).set(`date`, moment(objDate[0]).format(`DD`)).format();
    this._dueDate = moment(this._dueDate).set(`month`, moment(objDate[0]).subtract(1, `month`).format(`MM`)).format();
    this._dueDate = moment(this._dueDate).set(`year`, moment(objDate[0]).format(`YYYY`)).format();
  }

  _onTimeChange(objDate) {
    this._dueDate = moment(this._dueDate).set(`hour`, moment(objDate[0]).format(`H`)).format();
    this._dueDate = moment(this._dueDate).set(`minute`, moment(objDate[0]).format(`m`)).format();
  }

  _onChangeDate() {
    this._state.isDate = !this._state.isDate;
    this.removeListener();
    this._partialUpdate();
    this.addListener();
  }

  _onChangeRepeated() {
    this._state.isRepeated = !this._state.isRepeated;
    this.removeListener();
    this._partialUpdate();
    this.addListener();
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    const formData = new FormData(this._element.querySelector(`.${Selectors.CARD_FROM}`));
    const newData = this._processForm(formData);
    if (!this._state.isDate) {
      newData.dueDate = null;
    }
    if (typeof this._onSubmit === `function`) {
      this._onSubmit(newData);
    }
    this.update(newData);
  }

  _partialUpdate() {
    this._element.innerHTML = this.template;
  }

  _isData() {
    this._state.isData = Object.values(this._repeatingDays).some((it) => it.dueDate !== ``);
  }

  get _isDeadline() {
    return moment(this._dueDate).isSame(moment(new Date()).subtract(1, `days`), `day`);
  }

  _processForm(formData) {
    const entry = {
      title: ``,
      color: ``,
      tags: new Set(),
      dueDate: new Date(),
      repeatingDays: {
        'mo': false,
        'tu': false,
        'we': false,
        'th': false,
        'fr': false,
        'sa': false,
        'su': false,
      }
    };

    const taskEditMapper = TaskEdit.createMapper(entry);

    for (const pair of formData.entries()) {
      const [property, value] = pair;
      if (taskEditMapper[property]) {
        taskEditMapper[property](value);
      }
    }

    return entry;
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  get template() {
    return `
    <article class="card card--edit card--${(this._color)} ${this._state.isRepeated ? `card--repeat` : ``}${(this._isDeadline && this._state.isDate) ? ` card--deadline` : ``}">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">
              edit
            </button>
            <button
              type="button"
              class="card__btn card__btn--archive ${!this._isArchive ? `card__btn--disabled` : ``}"
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
                  date: <span class="card__date-status">${this._state.isDate ? `yes` : `no`}</span>
                </button>

                <fieldset class="card__date-deadline" ${!this._state.isDate && `disabled`}>
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__date"
                      type="text"
                      placeholder="${moment(this._dueDate).format(`DD MMMM`)}"
                      name="date"
                      value="${moment(this._dueDate).format(`DD MMMM`)}"
                      data-input
                    />
                  </label>
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__time"
                      type="text"
                      placeholder="${moment(this._dueDate).format(`hh:mm a`)}"
                      name="time"
                      value="${moment(this._dueDate).format(`hh:mm a`)}"
                      data-input
                    />
                  </label>
                </fieldset>

                <button class="card__repeat-toggle" type="button">
                  repeat: <span class="card__repeat-status">${this._state.isRepeated ? `yes` : `no`}</span>
                </button>

                <fieldset class="card__repeat-days" ${!this._state.isRepeated ? `disabled` : ``}>
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
                  ${this._color === `black` && `checked`}
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
                  ${this._color === `yellow` && `checked`}
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
                  ${this._color === `blue` && `checked`}
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
                  ${this._color === `green` && `checked`}
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
                  ${this._color === `pink` && `checked`}
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

  addListener() {
    this._element.querySelector(`.${Selectors.CARD_FROM}`)
      .addEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`.${Selectors.CARD_DATE_DEADLINE}`)
      .addEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.${Selectors.CARD_REPEAT_TOGGLE}`)
      .addEventListener(`click`, this._onChangeRepeated);

    if (this._state.isDate) {
      flatpickr(`.${Selectors.CARD_DATE}`, {
        altInput: true,
        altFormat: `j F`,
        dateFormat: `j F`,
        onChange: this._onDateChange.bind(this)
      });
      flatpickr(`.${Selectors.CARD_TIME}`, {
        enableTime: true,
        noCalendar: true,
        altInput: true,
        altFormat: `h:i K`,
        dateFormat: `h:i K`,
        onChange: this._onTimeChange.bind(this)
      });
    }
  }

  removeListener() {
    this._element.querySelector(`.${Selectors.CARD_FROM}`)
      .removeEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`.${Selectors.CARD_DATE_DEADLINE}`)
      .removeEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.${Selectors.CARD_REPEAT_TOGGLE}`)
      .removeEventListener(`click`, this._onChangeRepeated);
  }

  update(collection) {
    this._title = collection.title;
    this._picture = collection.picture;
    this._color = collection.color;
    this._repeatingDays = collection.repeatingDays;
    this._tags = collection.tags;
  }

  static createMapper(target) {
    return {
      hashtag: (value) => {
        target.tags.add(value);
      },
      text: (value) => {
        target.title = value;
      },
      color: (value) => {
        target.color = value;
      },
      repeat: (value) => {
        target.repeatingDays[value] = true;
      },
      date: (value) => {
        target.dueDate = moment(target.dueDate).set(`date`, moment(value, `DD MMMM`).format(`DD`)).format();
        target.dueDate = moment(target.dueDate).set(`month`, moment(value, `DD MMMM`).subtract(1, `month`).format(`MM`)).format();
      },
      time: (value) => {
        if (value) {
          target.dueDate = moment(target.dueDate).set(`hour`, moment(value, `h:m a`).format(`h`)).format();
          target.dueDate = moment(target.dueDate).set(`minute`, moment(value, `h:m a`).format(`m`)).format();
        }
      },
    };
  }
}
