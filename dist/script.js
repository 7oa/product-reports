!function(e){function t(t){for(var a,s,l=t[0],o=t[1],c=t[2],f=0,d=[];f<l.length;f++)s=l[f],Object.prototype.hasOwnProperty.call(i,s)&&i[s]&&d.push(i[s][0]),i[s]=0;for(a in o)Object.prototype.hasOwnProperty.call(o,a)&&(e[a]=o[a]);for(u&&u(t);d.length;)d.shift()();return r.push.apply(r,c||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],a=!0,l=1;l<n.length;l++){var o=n[l];0!==i[o]&&(a=!1)}a&&(r.splice(t--,1),e=s(s.s=n[0]))}return e}var a={},i={0:0},r=[];function s(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=a,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)s.d(n,a,function(t){return e[t]}.bind(null,a));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="";var l=window.webpackJsonp=window.webpackJsonp||[],o=l.push.bind(l);l.push=t,l=l.slice();for(var c=0;c<l.length;c++)t(l[c]);var u=o;r.push([121,1]),n()}({121:function(e,t,n){n(122),e.exports=n(311)},310:function(e,t,n){},311:function(e,t,n){"use strict";n.r(t);n(308),n(309);function a(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}var i=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,n,i;return t=e,(n=[{key:"getData",value:function(e){return new Promise((function(t,n){fetch(e).then((function(e){return e.json()})).then((function(e){return t(e)})).catch((function(e){return n(e)}))}))}}])&&a(t.prototype,n),i&&a(t,i),e}();function r(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}var s=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.element=t.element,this.table=t.table,this.data=t.data,this.columns=t.columns,this.onFilterChange=t.onFilterChange,this.filter=[]}var t,n,a;return t=e,(n=[{key:"bindEvents",value:function(){var e=this,t=this.elements.form,n=this.elements.buttonResetFilter;t.addEventListener("submit",(function(t){t.preventDefault(),e._submit()})),t.addEventListener("change",(function(t){t.preventDefault();var n=t.target;n.classList.contains("js-filter-input")&&e.validation(n)})),t.addEventListener("keyup",(function(e){e.preventDefault();var t=e.target;t.classList.contains("js-filter-input")&&(t.value=t.value.replace(/\D/g,""))})),n.addEventListener("click",(function(n){n.preventDefault(),t.reset(),e.setFilter([])}))}},{key:"_submit",value:function(){var e=this.elements.filterInputs,t=[];e.forEach((function(e){e.classList.contains("min")&&e.value!==e.min&&t.push({name:e.getAttribute("name"),min:e.value}),e.classList.contains("max")&&e.value!==e.max&&t.push({name:e.getAttribute("name"),max:e.value})})),this.setFilter(t)}},{key:"setFilter",value:function(e){JSON.stringify(e)!==JSON.stringify(this.filter)&&(this.filter=e,this.onFilterChange())}},{key:"validation",value:function(e){var t=e.name,n=Number(e.value),a=this.filters.find((function(t){return t.field===e.name}));if(n>a.max)e.value=a.max;else if(n<a.min)e.value=a.min;else if(e.classList.contains("min")){var i=this.getMaxInputValue(t);n>i&&(e.value=i)}else{var r=this.getMinInputValue(t);n<r&&(e.value=r)}}},{key:"getMinInputValue",value:function(e){return this.table.querySelector(".js-filter-input.min[name=".concat(e,"]")).value}},{key:"getMaxInputValue",value:function(e){return this.table.querySelector(".js-filter-input.max[name=".concat(e,"]")).value}},{key:"_generateFilterFields",value:function(){var e=this;this.filters=this.columns.map((function(t){var n=e.data[0][t.field],a=n,i=n;return e.data.forEach((function(e){e[t.field]>a&&(a=e[t.field]),e[t.field]<i&&(i=e[t.field])})),{field:t.field,title:t.title,min:i,max:a}}))}},{key:"render",value:function(){this._generateFilterFields();var e=this.filters.map((function(e){return'\n        <div class="filter__row js-filter-row" data-filter="'.concat(e.field,'">\n          <div class="filter__header">\n            <div class="filter__title">').concat(e.title,'</div>\n            <div class="filter__description">\n              (').concat(e.min,"-").concat(e.max,')\n            </div>\n          </div>\n          <div class="filter-input">\n            <input class="filter-input__input min js-filter-input" type="text" \n              name="').concat(e.field,'" \n              min="').concat(e.min,'" \n              max="').concat(e.max,'" \n              value="').concat(e.min,'" />\n            <label class="filter-input__label">min</label> \n          </div>\n          <div class="filter-input">\n            <input class="filter-input__input max js-filter-input" type="text" \n              name="').concat(e.field,'" \n              min="').concat(e.min,'" \n              max="').concat(e.max,'" \n              value="').concat(e.max,'" />\n            <label class="filter-input__label">max</label>\n          </div>\n        </div>\n      ')})),t='\n      <form class="js-filter-form">\n        <div class="filter">'.concat(e.join(" "),'</div>\n        <button class="filter__button js-filter">Filter</button>\n        <button class="filter__button js-reset-filter">Reset</button>\n      </form>\n    ');this.elements.filter.innerHTML=t,this.bindEvents()}},{key:"elements",get:function(){return{filter:this.table.querySelector(this.element),form:this.table.querySelector(".js-filter-form"),buttonResetFilter:this.table.querySelector(".js-reset-filter"),filterInputs:this.table.querySelectorAll(".js-filter-input")}}}])&&r(t.prototype,n),a&&r(t,a),e}();function l(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}var o=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.element=t.element,this.table=t.table,this.itemsPerPage=t.itemsPerPage,this.dataLength=t.dataLength,this.currentPage=1,this.onPageChange=t.onPageChange}var t,n,a;return t=e,(n=[{key:"bindEvents",value:function(){var e=this;this.elements.pagination.forEach((function(t){t.addEventListener("click",(function(t){if(t.preventDefault(),t.target.classList.contains("js-pagination-item")){var n=t.target.dataset.page;e.setPage(n)}}))})),this.elements.itemsPerPage.addEventListener("change",(function(t){t.preventDefault();var n=t.target.value;n!==e.itemsPerPage&&e.setItemsPerPage(n)}))}},{key:"setItemsPerPage",value:function(e){this.itemsPerPage=e,this.currentPage=1,this.onPageChange()}},{key:"setPage",value:function(e){this.currentPage=e,this.onPageChange()}},{key:"_generateSelectOptions",value:function(e){var t=this;return e.map((function(e){return'\n        <option value="'.concat(e,'" \n          ').concat(e===t.itemsPerPage?"selected":"",">\n          ").concat(e,"\n        </option>\n      ")}))}},{key:"renderItemsPerPage",value:function(){return'\n        <div class="items-per-page">\n          <div class="items-per-page__label">Items Per Page</div>\n          <select class="items-per-page__select js-items-per-page">\n            '.concat(this._generateSelectOptions([10,30,50,70,100]),"\n          </select>\n        </div>\n      ")}},{key:"_generatePages",value:function(e){var t=+this.currentPage,n=+e,a={start:Math.round(t-2),end:Math.round(t+2)};function i(e,t){return Array(t-e+1).fill().map((function(t,n){return n+e}))}a.start-1!=1&&a.end+1!==n||(a.start+=1,a.end+=1);var r=t>4?i(Math.min(a.start,n-4),Math.min(a.end,n)):i(1,Math.min(n,5)),s=function(e,t){return r.length+1!==n?t:[e]};return 1!==r[0]&&(r=s(1,[1,"..."]).concat(r)),r[r.length-1]<n&&(r=r.concat(s(n,["...",n]))),r}},{key:"renderPagination",value:function(e,t){var n=this,a=e.map((function(e){return"..."!==e?'\n          <span \n            class="js-pagination-item pagination__item'.concat(e===+n.currentPage?" active":"",'" \n            data-page=').concat(e,">\n            ").concat(e,"\n          </span>\n        "):'<span class="pagination__dots">'.concat(e,"</span>")}));return'\n      <div class="pagination js-pagination">\n        '.concat(t>1?a.join(" "):"","\n      </div>\n    ")}},{key:"render",value:function(){var e=this,t=Math.ceil(this.dataLength/this.itemsPerPage),n=this._generatePages(t);this.elements.pagination.forEach((function(a){a.innerHTML=e.renderPagination(n,t)})),this.bindEvents()}},{key:"elements",get:function(){return{pagination:this.table.querySelectorAll(this.element),itemsPerPage:this.table.querySelector(".js-items-per-page")}}}])&&l(t.prototype,n),a&&l(t,a),e}(),c=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"asc";return e?function(n,a){if(!n.hasOwnProperty(e)||!a.hasOwnProperty(e))return 0;var i=0;return n[e]>a[e]&&(i=1),n[e]<a[e]&&(i=-1),"desc"===t?-1*i:i}:0};function u(e){return function(e){if(Array.isArray(e))return f(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return f(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return f(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function d(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}var v=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.element=document.querySelector(t.element),this.initialData=u(t.data),this.data=u(t.data),this.columns=t.columns,this.sortOrder="",this.sortField="",this.filter=new s({element:".js-table-filter",table:this.element,data:this.data,columns:this.columns.filter((function(e){return!0===e.filter})),onFilterChange:this.onFilterChange.bind(this)}),this.pagination=new o({element:".js-table-pagination",table:this.element,itemsPerPage:t.itemsPerPage,dataLength:this.data.length,onPageChange:this.onPageChange.bind(this)})}var t,n,a;return t=e,(n=[{key:"bindEvents",value:function(){var e=this;this.elements.tableHead.addEventListener("click",(function(t){if(t.preventDefault(),t.target.classList.contains("js-sort")){var n=t.target.dataset.field,a=t.target.dataset.sort;e.element.querySelectorAll(".js-sort").forEach((function(e){e.dataset.sort=""}));var i=e._getNewSortOrder(a);t.target.dataset.sort=i,e.setSort(n,i)}}))}},{key:"_getNewSortOrder",value:function(e){var t=["asc","desc",""],n=t.indexOf(e);return n===t.length-1?t[0]:t[n+1]}},{key:"onPageChange",value:function(){this.renderData()}},{key:"onFilterChange",value:function(){this.updateData()}},{key:"setSort",value:function(e,t){this.sortOrder=t,this.sortField=e,this.updateData()}},{key:"setData",value:function(){var e=this.sortData(u(this.initialData));this.data=this.filterData(e)}},{key:"updateData",value:function(){this.setData(),this.pagination.currentPage=1,this.pagination.dataLength=this.data.length,this.renderData()}},{key:"sortData",value:function(e){var t=[],n=this.sortField;switch(this.sortOrder){case"asc":t=e.sort(c(n,"asc"));break;case"desc":t=e.sort(c(n,"desc"));break;case"":t=e}return t}},{key:"filterData",value:function(e){var t=this.filter.filter;return e.filter((function(e){return t.every((function(t){return t.min?e[t.name]>=t.min:t.max?e[t.name]<=t.max:void 0}))}))}},{key:"_generateHead",value:function(){return this.columns.map((function(e){return'\n          <div class="table__col'.concat(e.sort?" js-sort":"",'" \n            data-field="').concat(e.field,'">\n            ').concat(e.title,"\n          </div>\n        ")})).join(" ")}},{key:"_generateRow",value:function(e){var t=this;return this.columns.map((function(n){return"displayName"===n.field?'\n          <div class="table__col">\n            '.concat(t._generateTitle(e,n.field),"\n          </div>"):'<div class="table__col">'.concat(e[n.field],"</div>")})).join(" ")}},{key:"_generateTitle",value:function(e){return"\n      <div><strong>".concat(e.displayName,"</strong></div>\n      <div><small>").concat(e.productKey,"</small></div>\n      ").concat(e.image?'<img src="'.concat("https://s3.eu-central-1.amazonaws.com/showcase-demo-images/fashion/images/",'" />'):"","\n    ")}},{key:"_template",value:function(e){var t=this;return e.map((function(e){return'\n        <div class="table__row">\n            '.concat(t._generateRow(e),"\n        </div>\n        ")}))}},{key:"renderData",value:function(){var e=+this.pagination.itemsPerPage,t=(+this.pagination.currentPage-1)*e,n=t+e,a=this._template(this.data.slice(t,n));this.elements.tableBody.innerHTML=a.join(" "),this.pagination.render()}},{key:"renderTable",value:function(){var e='\n      <div class="table">\n        <div class="table__filter js-table-filter"></div>\n        <div class="table__pagination-wrapper">\n          <div class="table__pagination js-table-pagination"></div>\n          <div class="table__select-items">\n            '.concat(this.pagination.renderItemsPerPage(),'\n          </div>\n        </div>\n        <div class="table__head js-table-head">\n          <div class="table__row">\n            ').concat(this._generateHead(),'\n          </div>\n        </div>\n        <div class="table__body js-table-body">\n        </div>\n        <div class="table__pagination-wrapper">\n          <div class="table__pagination js-table-pagination"></div>\n        </div>\n      </div>\n    ');this.element.innerHTML=e,this.renderData(),this.filter.render(),this.bindEvents()}},{key:"elements",get:function(){return{tableHead:this.element.querySelector(".js-table-head"),tableBody:this.element.querySelector(".js-table-body")}}}])&&d(t.prototype,n),a&&d(t,a),e}(),h=(n(310),[{field:"displayName",title:"Display title",filter:!1,sort:!1},{field:"displays",title:"Displays",filter:!0,sort:!0},{field:"clicks",title:"Clicks",filter:!0,sort:!0},{field:"orders",title:"Purchases",filter:!0,sort:!0},{field:"abandonedUnits",title:"Abandoned Units ",filter:!0,sort:!0},{field:"soldUnits",title:"Sold units ",filter:!0,sort:!0},{field:"revenue",title:"Revenue ",filter:!0,sort:!0},{field:"profit",title:"Profit ",filter:!0,sort:!0}]);(new i).getData("../data/product-data.json").then((function(e){new v({element:"#app",data:e,itemsPerPage:30,columns:h}).renderTable()}))}});