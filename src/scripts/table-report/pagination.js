class Pagination {
  constructor(props) {
    this.element = props.element;
    this.itemsPerPage = props.itemsPerPage;
    this.dataLength = props.dataLength;
    this.currentPage = 1;
    this.onPageChange = props.onPageChange;
  }

  bindEvents() {
    document.querySelectorAll(".js-pagination").forEach((el) => {
      el.addEventListener("click", (evt) => {
        evt.preventDefault();
        if (evt.target.classList.contains("js-pagination-item")) {
          const selectedPage = evt.target.dataset.page;
          this.setPage(selectedPage);
        }
      });
    });
    document.querySelector(".js-items-per-page").addEventListener("change", (evt) => {
      evt.preventDefault();
      let itemsPerPage = evt.target.value;
      if (itemsPerPage !== this.itemsPerPage) {
        this.setItemsPerPage(itemsPerPage);
      }
    });
  }

  setItemsPerPage(itemsPerPage) {
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1;
    this.onPageChange();
  }

  setPage(page) {
    this.currentPage = page;
    this.onPageChange();
  }

  _generateSelectOptions(options) {
    return options.map((option) => {
      return `
        <option value="${option}" 
          ${option === this.itemsPerPage ? "selected" : ""}>
          ${option}
        </option>
      `;
    });
  }

  renderItemsPerPage() {
    return `
        <div class="items-per-page">
          <div class="items-per-page__label">Items Per Page</div>
          <select class="items-per-page__select js-items-per-page">
            ${this._generateSelectOptions([10, 30, 50, 70, 100])}
          </select>
        </div>
      `;
  }

  _generatePages(pageCount) {
    const current = +this.currentPage;
    const length = +pageCount;
    const delta = 4;
    const range = {
      start: Math.round(current - delta / 2),
      end: Math.round(current + delta / 2),
    };

    function getRange(start, end) {
      return Array(end - start + 1)
        .fill()
        .map((_, i) => i + start);
    }

    if (range.start - 1 === 1 || range.end + 1 === length) {
      range.start += 1;
      range.end += 1;
    }

    let pages =
      current > delta
        ? getRange(Math.min(range.start, length - delta), Math.min(range.end, length))
        : getRange(1, Math.min(length, delta + 1));

    const withDots = (value, pair) => (pages.length + 1 !== length ? pair : [value]);

    if (pages[0] !== 1) {
      pages = withDots(1, [1, "..."]).concat(pages);
    }

    if (pages[pages.length - 1] < length) {
      pages = pages.concat(withDots(length, ["...", length]));
    }

    const pagesList = pages.map((page) => {
      if (page !== "...") {
        return `
          <span 
            class="js-pagination-item pagination__item${
              page === +this.currentPage ? " active" : ""
            }" 
            data-page=${page}>
            ${page}
          </span>
        `;
      } else return `<span class="pagination__dots">${page}</span>`;
    });

    return pagesList;
  }

  render() {
    const pageCount = Math.ceil(this.dataLength / this.itemsPerPage);

    const template = `
      <div class="pagination js-pagination">
        ${pageCount > 1 ? this._generatePages(pageCount).join(" ") : ""}
      </div>
    `;

    document.querySelectorAll(this.element).forEach((el) => {
      el.innerHTML = template;
    });
    this.bindEvents();
  }
}

export default Pagination;
