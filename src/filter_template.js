/**
 * Шаблон фильтра.
 * @param {object} element Объект с данными для фильтра.
 * @param {bool} isFirst Признак первого элемента.
 * @return {string} разметка HTML блока с фильтром.
 */
export default (element, isFirst) => `
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
