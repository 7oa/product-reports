import Filter from "./filter.js";
import Pagination from "./pagination.js";
// import { imageLink } from "./image-link.js";
import { sortFunc } from "../utils.js";

class TableReport {
  constructor(props) {
    this.element = document.querySelector(props.element);
    this.initialData = [...props.data];
    this.data = [...props.data];
    this.columns = props.columns;
    this.sortOrder = "";
    this.sortField = "";
    this.filter = new Filter({
      element: ".js-table-filter",
      table: this.element,
      data: this.data,
      columns: this.columns.filter((el) => el.filter === true),
      onFilterChange: this.onFilterChange.bind(this),
    });
    this.pagination = new Pagination({
      element: ".js-table-pagination",
      table: this.element,
      itemsPerPage: props.itemsPerPage,
      dataLength: this.data.length,
      onPageChange: this.onPageChange.bind(this),
    });
  }

  get elements() {
    return {
      tableHead: this.element.querySelector(".js-table-head"),
      tableBody: this.element.querySelector(".js-table-body"),
    };
  }

  bindEvents() {
    this.elements.tableHead.addEventListener("click", (evt) => {
      evt.preventDefault();
      if (evt.target.classList.contains("js-sort")) {
        const sortField = evt.target.dataset.field;
        const sortOrder = evt.target.dataset.sort;

        this.element.querySelectorAll(".js-sort").forEach((el) => {
          el.dataset.sort = "";
        });

        const newSortOrder = this._getNewSortOrder(sortOrder);
        evt.target.dataset.sort = newSortOrder;

        this.setSort(sortField, newSortOrder);
      }
    });
  }

  _getNewSortOrder(currentSortOrder) {
    let newSortOrder;
    const orders = ["asc", "desc", ""];
    const index = orders.indexOf(currentSortOrder);

    if (index === orders.length - 1) {
      newSortOrder = orders[0];
    } else {
      newSortOrder = orders[index + 1];
    }

    return newSortOrder;
  }

  onPageChange() {
    this.renderData();
  }

  onFilterChange() {
    this.updateData();
  }

  setSort(field, orderBy) {
    this.sortOrder = orderBy;
    this.sortField = field;
    this.updateData();
  }

  setData() {
    const sortedData = this.sortData([...this.initialData]);
    this.data = this.filterData(sortedData);
  }

  updateData() {
    this.setData();
    this.pagination.currentPage = 1;
    this.pagination.dataLength = this.data.length;
    this.renderData();
  }

  sortData(data) {
    let sortedData = [];
    const field = this.sortField;
    const orderBy = this.sortOrder;
    switch (orderBy) {
      case "asc":
        sortedData = data.sort(sortFunc(field, "asc"));
        break;
      case "desc":
        sortedData = data.sort(sortFunc(field, "desc"));
        break;
      case "":
        sortedData = data;
        break;
    }
    return sortedData;
  }

  filterData(data) {
    let filteredData = [];
    const filters = this.filter.filter;
    filteredData = data.filter((el) => {
      return filters.every((filter) => {
        if (filter.min) return el[filter.name] >= filter.min;
        if (filter.max) return el[filter.name] <= filter.max;
      });
    });
    return filteredData;
  }

  _generateHead() {
    return this.columns
      .map((column) => {
        return `
          <div class="table__col${column.sort ? " js-sort" : ""}" 
            data-field="${column.field}">
            ${column.title}
          </div>
        `;
      })
      .join(" ");
  }

  _generateRow(el) {
    return this.columns
      .map((column) => {
        if (column.field === "displayName") {
          return `
          <div class="table__col">
            ${this._generateTitle(el, column.field)}
          </div>`;
        } else {
          return `<div class="table__col">${el[column.field]}</div>`;
        }
      })
      .join(" ");
  }

  _generateTitle(el) {
    const imageLink = 'https://www.brother.in/AP/Handlers/ApHandler.ashx?m=rs&guid=8d068527-2779-4f00-8a1a-8f9cc59e3f39&pr=100';
    return `
      <div><strong>${el.displayName}</strong></div>
      <div><small>${el.productKey}</small></div>
      ${el.image ? `<img src="${imageLink}" />` : ""}
    `;
  }

  _template(data) {
    return data.map((el) => {
      return `
        <div class="table__row">
            ${this._generateRow(el)}
        </div>
        `;
    });
  }

  renderData() {
    const itemsPerPage = +this.pagination.itemsPerPage;
    const currentPage = +this.pagination.currentPage;
    const dataFrom = (currentPage - 1) * itemsPerPage;
    const dataTo = dataFrom + itemsPerPage;

    const template = this._template(this.data.slice(dataFrom, dataTo));
    this.elements.tableBody.innerHTML = template.join(" ");
    this.pagination.render();
  }

  renderTable() {
    const template = `
      <div class="table">
        <div class="table__filter js-table-filter"></div>
        <div class="table__pagination-wrapper">
          <div class="table__pagination js-table-pagination"></div>
          <div class="table__select-items">
            ${this.pagination.renderItemsPerPage()}
          </div>
        </div>
        <div class="table__head js-table-head">
          <div class="table__row">
            ${this._generateHead()}
          </div>
        </div>
        <div class="table__body js-table-body">
        </div>
        <div class="table__pagination-wrapper">
          <div class="table__pagination js-table-pagination"></div>
        </div>
      </div>
    `;

    this.element.innerHTML = template;
    this.renderData();
    this.filter.render();
    this.bindEvents();
  }
}

export default TableReport;
