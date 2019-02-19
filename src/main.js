'use struct';

(() => {
  const Selector = {
    FILTER_SECTION: 'main__filter',
    FILTER_INPUT: 'filter__input',
    FILTER_LABEL: 'filter__label',
  };

  const FilterFillData = [
    {
      'title' : 'all',
      'count' : 15,
    },
    {
      'title' : 'overdue',
      'count' : 0,
    },
    {
      'title' : 'today',
      'count' : 0,
    },
    {
      'title' : 'favorites',
      'count' : 7,
    },
    {
      'title' : 'repeating',
      'count' : 2,
    },
    {
      'title' : 'tags',
      'count' : 6,
    },
    {
      'title' : 'archive',
      'count' : 200,
    },
  ];

  const removeChildren = function (parent, children) {
    for (let i = 0; i < children.length; i++) {
      parent.removeChild(children[i]);
    }
  };

  const filterSection = document.querySelector(`.${Selector.FILTER_SECTION}`);
  const filterInputList = document.querySelectorAll(`.${Selector.FILTER_INPUT}`);
  const filterLabelList = document.querySelectorAll(`.${Selector.FILTER_LABEL}`);

  const filtersRender = (collections) => {
    let isFirstElement = true;

    removeChildren(filterSection, filterInputList);
    removeChildren(filterSection, filterLabelList);

    collections.forEach( (element) => {
      const filterInput = document.createElement(`input`);
      filterInput.setAttribute(`type`, `radio`);
      filterInput.setAttribute(`id`, `filter__${element.title}`);
      filterInput.classList.add('filter__input', 'visually-hidden');
      filterInput.setAttribute(`name`, `filter`);
      if (isFirstElement) {
        filterInput.setAttribute(`checked`, ``)
      };
      if (element.count === 0) {
        filterInput.setAttribute(`disabled`, ``);
      }
      isFirstElement = false;
      const filterLabel = document.createElement(`label`);
      filterLabel.setAttribute(`for`, `filter__${element.title}`);
      filterLabel.classList.add('filter__label');
      const filterText = `${element.title} `;
      filterLabel.textContent = filterText.toUpperCase();
      const span = document.createElement(`span`);
      span.classList.add(`filter__${element.title}-count`);
      span.textContent = element.count;
      filterLabel.appendChild(span);
      filterSection.appendChild(filterInput);
      filterSection.appendChild(filterLabel);
    })
  };

  filtersRender(FilterFillData);

})();
