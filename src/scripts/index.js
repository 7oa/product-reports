import "nodelist-foreach-polyfill";
import "whatwg-fetch";
import Data from "./data.js";
import TableReport from "./table-report/table-report.js";
import "../css/style.scss";

const columns = [
  {
    field: "displayName",
    title: "Display title",
    filter: false,
    sort: false,
  },
  {
    field: "displays",
    title: "Displays",
    filter: true,
    sort: true,
  },
  {
    field: "clicks",
    title: "Clicks",
    filter: true,
    sort: true,
  },
  {
    field: "orders",
    title: "Purchases",
    filter: true,
    sort: true,
  },
  {
    field: "abandonedUnits",
    title: "Abandoned Units ",
    filter: true,
    sort: true,
  },
  {
    field: "soldUnits",
    title: "Sold units ",
    filter: true,
    sort: true,
  },
  {
    field: "revenue",
    title: "Revenue ",
    filter: true,
    sort: true,
  },
  {
    field: "profit",
    title: "Profit ",
    filter: true,
    sort: true,
  },
];

new Data().getData("data/product-data.json").then((data) => {
  new TableReport({
    data,
    itemsPerPage: 50,
    columns,
  }).renderTable();
});
