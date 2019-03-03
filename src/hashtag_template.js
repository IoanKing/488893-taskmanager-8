/**
 * Шаблон хештега.
 * @param {string} hashtag Наименование хештега.
 * @return {string} разметка HTML блока для хештега.
 */
export default (hashtag) => `
  <span class="card__hashtag-inner">
    <input
      type="hidden"
      name="hashtag"
      value="repeat"
      class="card__hashtag-hidden-input"
    />
    <button type="button" class="card__hashtag-name">
      #${hashtag}
    </button>
    <button type="button" class="card__hashtag-delete">
      delete
    </button>
  </span>`;
