class Filter {
  constructor(props) {
    this.element = props.element;
    this.data = props.data;
    this.columns = props.columns;
    this.onFilterChange = props.onFilterChange;
    this.filter = [];
  }

  bindEvents() {
    const form = document.querySelector(".js-filter-form");
    const buttonResetFilter = document.querySelector(".js-reset-filter");
    const filterInputs = document.querySelectorAll(".js-filter-input");

    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      let filter = [];
      filterInputs.forEach((input) => {
        if (input.classList.contains("min") && input.value !== input.min) {
          filter.push({
            name: input.getAttribute("name"),
            min: input.value,
          });
        }
        if (input.classList.contains("max") && input.value !== input.max) {
          filter.push({
            name: input.getAttribute("name"),
            max: input.value,
          });
        }
      });
      this.setFilter(filter);
    });

    filterInputs.forEach((input) => {
      input.addEventListener("change", (evt) => {
        evt.preventDefault();
        this.validation(input);
      });

      input.addEventListener("keyup", (evt) => {
        evt.preventDefault;
        input.value = input.value.replace(/\D/g, "");
      });
    });

    buttonResetFilter.addEventListener("click", (evt) => {
      evt.preventDefault();
      form.reset();
      this.setFilter([]);
    });
  }

  setFilter(filter) {
    if (JSON.stringify(filter) !== JSON.stringify(this.filter)) {
      this.filter = [];
      this.filter = filter;
      this.onFilterChange();
    }
  }

  validation(input) {
    const name = input.name;
    let value = 0;
    if (input.classList.contains("min")) {
      value = document.querySelector(`.js-filter-input.max[name=${name}]`).value;
      if (+input.value > +value) {
        input.value = value;
      }
      if (+input.value < +input.min) {
        input.value = input.min;
      }
    }
    if (input.classList.contains("max")) {
      value = document.querySelector(`.js-filter-input.min[name=${name}]`).value;
      if (+input.value < +value) {
        input.value = value;
      }
      if (+input.value > +input.max) {
        input.value = input.max;
      }
    }

    if (input.value === "") {
      input.value = 0;
    }
  }

  _generateFilterFields() {
    this.filters = this.columns.map((column) => {
      let firstElValue = this.data[0][column.field];
      let max = firstElValue;
      let min = firstElValue;
      this.data.forEach((el) => {
        if (el[column.field] > max) max = el[column.field];
        if (el[column.field] < min) min = el[column.field];
      });
      return {
        field: column.field,
        title: column.title,
        min,
        max,
      };
    });
  }

  render() {
    this._generateFilterFields();

    const filters = this.filters.map(
      (filter) => `
        <div class="filter__row js-filter-row" data-filter="${filter.field}">
          <div class="filter__header">
            <div class="filter__title">${filter.title}</div>
            <div class="filter__description">
              (${filter.min}-${filter.max})
            </div>
          </div>
          <div class="filter-input">
            <input class="filter-input__input min js-filter-input" type="text" 
              name="${filter.field}" 
              min="${filter.min}" 
              max="${filter.max}" 
              value="${filter.min}" />
            <label class="filter-input__label">min</label> 
          </div>
          <div class="filter-input">
            <input class="filter-input__input max js-filter-input" type="text" 
              name="${filter.field}" 
              min="${filter.min}" 
              max="${filter.max}" 
              value="${filter.max}" />
            <label class="filter-input__label">max</label>
          </div>
        </div>
      `
    );

    const template = `
      <form class="js-filter-form">
        <div class="filter">${filters.join(" ")}</div>
        <button class="filter__button js-filter">Filter</button>
        <button class="filter__button js-reset-filter">Reset</button>
      </form>
    `;

    document.querySelector(this.element).innerHTML = template;
    this.bindEvents();
  }
}
export default Filter;
