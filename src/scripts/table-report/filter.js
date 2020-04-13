class Filter {
  constructor(props) {
    this.element = props.element;
    this.table = props.table;
    this.data = props.data;
    this.columns = props.columns;
    this.onFilterChange = props.onFilterChange;
    this.filter = [];
  }

  get elements() {
    return {
      filter: this.table.querySelector(this.element),
      form: this.table.querySelector(".js-filter-form"),
      buttonResetFilter: this.table.querySelector(".js-reset-filter"),
      filterInputs: this.table.querySelectorAll(".js-filter-input"),
    };
  }

  bindEvents() {
    const form = this.elements.form;
    const buttonResetFilter = this.elements.buttonResetFilter;

    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submit();
    });

    form.addEventListener("change", (evt) => {
      evt.preventDefault();
      const input = evt.target;
      if (input.classList.contains("js-filter-input")) {
        this.validation(input);
      }
    });

    form.addEventListener("keyup", (evt) => {
      evt.preventDefault();
      const input = evt.target;
      if (input.classList.contains("js-filter-input")) {
        input.value = input.value.replace(/\D/g, "");
      }
    });

    buttonResetFilter.addEventListener("click", (evt) => {
      evt.preventDefault();
      form.reset();
      this.setFilter([]);
    });
  }

  _submit() {
    const filterInputs = this.elements.filterInputs;
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
  }

  setFilter(filter) {
    if (JSON.stringify(filter) !== JSON.stringify(this.filter)) {
      this.filter = filter;
      this.onFilterChange();
    }
  }

  validation(input) {
    const name = input.name;
    const value = Number(input.value);
    const filter = this.filters.find((f) => f.field === input.name);

    if (value > filter.max) {
      input.value = filter.max;
    } else if (value < filter.min) {
      input.value = filter.min;
    } else {
      if (input.classList.contains("min")) {
        const maxValue = this.getMaxInputValue(name);
        if (value > maxValue) {
          input.value = maxValue;
        }
      } else {
        const minValue = this.getMinInputValue(name);
        if (value < minValue) {
          input.value = minValue;
        }
      }
    }
  }

  getMinInputValue(name) {
    return this.table.querySelector(`.js-filter-input.min[name=${name}]`).value;
  }

  getMaxInputValue(name) {
    return this.table.querySelector(`.js-filter-input.max[name=${name}]`).value;
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

    this.elements.filter.innerHTML = template;
    this.bindEvents();
  }
}
export default Filter;
