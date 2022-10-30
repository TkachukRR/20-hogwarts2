import { API_URL, URL_STUDENTS, URL_HOUSE } from "../../constants/api";
import { getApiData } from "../../utils/getApiData";
import { PAGE_SETTINGS } from "../../constants/pageSettings";
import { getCamelcaseString } from "../../utils/getCamelcaseString";
import { REFS } from "../../constants/root";

import "./Table.scss";

class Table {
  async renderHeader() {
    const tableHeaderNamesArray = getTableHeaderNamesArray();
    const tableHeaderMarkup = tableHeaderNamesArray
      .map(
        (name) => `
              <th data-th-name="${getCamelcaseString(name)}">${name}</th>`
      )
      .join("");

    const tableHeaderRowMarkup = `<thead class="table__header"><tr>${tableHeaderMarkup}</tr></thead>`;

    function getTableHeaderNamesArray() {
      const tableHeaderNames = [];

      Object.values(PAGE_SETTINGS).forEach((element) => {
        if (!element.hasOwnProperty("tableHeader")) {
          return;
        }
        if (tableHeaderNames.indexOf(element.tableHeader) !== -1) {
          return;
        }
        tableHeaderNames.push(element.tableHeader);
      });

      return tableHeaderNames;
    }

    REFS.pageTable.innerHTML = `<table class="table"></table>`;
    REFS.pageTable
      .querySelector(".table")
      .insertAdjacentHTML("afterbegin", tableHeaderRowMarkup);
  }

  async renderBody(url) {
    if (!REFS.pageTable.querySelector(".table__body")) {
      REFS.pageTable
      .querySelector(".table")
      .insertAdjacentHTML("beforeend", `<tbody class="table__body"></tbody>`);
    }
       
    const data = await getApiData.getData(url);

    const values = Object.keys(PAGE_SETTINGS);
    console.log(values)

    const tableBodyRowsMarkup = data.map(element => {
        const { name, dateOfBirth, house, wizard, ancestry, hogwartsStudent, hogwartsStaff } = element

        function getStudentStaff() {
            if (hogwartsStaff) {return 'staff'}
            if (hogwartsStudent) {return 'student'}
            if (!hogwartsStudent && !hogwartsStaff) {return '-'}
        }

        return `<tr>
            <td>${name}</td>
            <td>${dateOfBirth}</td>
            <td>${house}</td>
            <td>${wizard}</td>
            <td>${ancestry}</td>
            <td>${getStudentStaff()}</td>
        </tr>`;
    }).join("");

    REFS.pageTable.querySelector(".table__body").innerHTML = tableBodyRowsMarkup
  }

  
}

export default new Table();
