(() => {
  const MAX_TASK_COUNT = 20;
  const DEFAULT_TASK_COUNT = 10;

  const Selector = {
    FILTER_SECTION: `main__filter`,
    FILTER_INPUT: `filter__input`,
    FILTER_LABEL: `filter__label`,
    BOARD_TASKS: `board__tasks`,
  };

  const mockData = {
    COLOR: [`black`, `yellow`, `blue`, `green`, `pink`],
    FAVORITE: [true, false],
    REPEAT: [true, false],
    TEXT: [`This is example of new task, you can add picture, set date and time, add tags.`,
      `It is example of repeating task. It marks by wave.`,
      `This is card with missing deadline.`,
      `Here is a card with filled data.`,
      ``],
    DEADLINE: [true, false],
    DATE: [`23 september`, `10 februaly`, `23 februaly`, `10 jule`, `13 april`],
    TIME: [`11:15 PM`, `10:00 AM`, `6:25 PM`, `0:01 AM`, `1:30 PM`, ``],
    IMG: [`img/sample-img.jpg`, ``, ``, ``],
    HASHTAG: [`#repeat`, `#cinema`, `#entertaiment`, `#testing`]
  };

  const FilterMockData = [
    {
      title: `all`,
      count: 7,
    },
    {
      title: `overdue`,
      count: 0,
    },
    {
      title: `today`,
      count: 0,
    },
    {
      title: `favorites`,
      count: 7,
    },
    {
      title: `repeating`,
      count: 2,
    },
    {
      title: `tags`,
      count: 6,
    },
    {
      title: `archive`,
      count: 115,
    },
  ];

  const board = document.querySelector(`.${Selector.BOARD_TASKS}`);
  const filterSection = document.querySelector(`.${Selector.FILTER_SECTION}`);

  /**
   * Шаблон фильтра.
   * @param {object} element Объект с данными для фильтра.
   * @param {bool} isFirst Признак первого элемента.
   * @return {string} шаблон HTML блока с фильтром.
   */
  const filterTemplate = (element, isFirst) => `
    <input
      type="radio"
      id="filter__${element.title}"
      class="filter__input visually-hidden"
      name="filter"
      ${(isFirst) ? `checked` : ``}
      ${(element.count === 0) ? `disabled` : ``}
    />
    <label for="filter__${element.title}" class="filter__label">
      ${element.title.toUpperCase()}
      <span class="filter__${element.title}-count">${element.count}</span>
    </label>`;

  /**
   * Шаблон карточки задачи.
   * @param {object} element Объект с данными для карточки задачи.
   * @return {string} Шаблон HTML блока с карточкой задачи.
   */
  const cardTemplate = (element) => {

    let hashtagList = ``;

    element.hashtags.forEach( (currentHashtag) => {
      hashtagList = hashtagList + hashtagTemplate(currentHashtag);
    });

    return `<article class="card card--${(element.color)} ${(element.isRepeat) ? `card--repeat` : ``}">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">
              edit
            </button>
            <button type="button" class="card__btn card__btn--archive">
              archive
            </button>
            <button
              type="button"
              class="card__btn card__btn--favorites ${(!element.isFavorite) ? `card__btn--disabled` : ``}"
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
              >${element.text}</textarea>
            </label>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">no</span>
                </button>

                <fieldset class="card__date-deadline" ${(element.isDeadline) ? `disabled`: ``}>
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__date"
                      type="text"
                      placeholder="${element.data}"
                      name="date"
                      value="${element.data}"
                    />
                  </label>
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__time"
                      type="text"
                      placeholder="${element.time}"
                      name="time"
                      value="${element.time}"
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
                      checked
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
                      checked
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
                      checked
                    />
                    <label class="card__repeat-day" for="repeat-su-6"
                      >su</label
                    >
                  </div>
                </fieldset>
              </div>

              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  ${hashtagList}
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

            <label class="card__img-wrap ${(!element.img) ? `card__img-wrap--empty` : ``}">
              <input
                type="file"
                class="card__img-input visually-hidden"
                name="img"
              />
              <img
                src="${(element.img) ? element.img : ``}"
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
    </article>`;
  };

  /**
   * Шаблон хештега.
   * @param {string} hashtag Наименование хештега.
   * @return {string} Шаблон HTML блока для хештега.
   */
  const hashtagTemplate = (hashtag) => `
    <span class="card__hashtag-inner">
      <input
        type="hidden"
        name="hashtag"
        value="repeat"
        class="card__hashtag-hidden-input"
      />
      <button type="button" class="card__hashtag-name">
        ${hashtag}
      </button>
      <button type="button" class="card__hashtag-delete">
        delete
      </button>
    </span>`;

  /**
   * Генерация случайного числа на заданном интервале.
   * @param {number} min минимальное значение интервала
   * @param {number} max максимальнео значение интервала
   * @return {number} Число.
   */
  const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

  /**
   * Выбор случайного элемента из коллекции объектов.
   * @param {object} collection коллекция объектов.
   * @return {object} элемент коллекции объектов.
   */
  const getRandomElement = (collection) => collection[getRandomInt(0, collection.length)];

  /**
   * Генерация случайного количества карточек задач.
   * @param {number} maxCount Максимальное количество карточек задач.
   * @return {object} коллекция объектов.
   */
  const getRandomCollection = (maxCount) => {
    const countElement = getRandomInt(1, Math.min(maxCount, DEFAULT_TASK_COUNT));
    return getCollection(countElement);
  };

  /**
   * Генерация коллекции случайных карточек задач.
   * @param {number} countCollection Количество карточек задач.
   * @return {object} коллекция объектов.
   */
  const getCollection = (countCollection) => {
    const collection = [];
    for (let i = 0; i < countCollection; i++) {
      const countHashtag = getRandomInt(0, 4);
      const newHashtags = [];
      for (let j = 0; j < countHashtag; j++) {
        const tag = getRandomElement(mockData.HASHTAG);
        newHashtags.push(tag);
      }
      const newElement = {
        color: getRandomElement(mockData.COLOR),
        isFavorite: getRandomElement(mockData.FAVORITE),
        isRepeat: getRandomElement(mockData.REPEAT),
        text: getRandomElement(mockData.TEXT),
        isDeadline: getRandomElement(mockData.DEADLINE),
        data: getRandomElement(mockData.DATE),
        time: getRandomElement(mockData.TIME),
        img:  getRandomElement(mockData.IMG),
        hashtags: newHashtags,
      };
      collection.push(newElement);
    }
    return collection;
  };

  /**
   * Отрисовка фильтров.
   * @param {object} collection Коллекция обьектов "Фильтр".
   */
  const renderFilterList = (collection) => {
    let isFirstElement = true;
    filterSection.innerHTML = ``;
    collection.forEach( (element) => {
      filterSection.insertAdjacentHTML(`beforeend`, filterTemplate(element, isFirstElement) );
      isFirstElement = false;
    });
  };

  /**
   * Отрисовка карточек задач.
   * @param {object} collection Коллекция обьектов "Карточки задач".
   */
  const cardRender = (collection) => {
    board.innerHTML = ``;
    collection.forEach( (element) => {
      board.insertAdjacentHTML(`beforeend`, cardTemplate(element) );
    });
  };

  /**
   * Обновление списка карточек задач.
   * @param {number} maxCount Максимальное количество карточек задач.
   */
  const refreshCollection = (maxCount = MAX_TASK_COUNT) => {
    const newRandomData = getCollection(maxCount);
    cardRender(newRandomData);
  };

  renderFilterList(FilterMockData);
  const randomData = getCollection(7);
  cardRender(randomData);

  document.body.addEventListener(`click`, (evt) => {
    if ( evt.target.classList.contains(`${Selector.FILTER_INPUT}`) ) {
      const filterCount = evt.target.nextElementSibling.querySelector(`span`).textContent;
      refreshCollection( Math.min(+filterCount, MAX_TASK_COUNT) );
    }
  });

})();
