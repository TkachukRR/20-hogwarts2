import { API_URL, URL_STUDENTS, URL_HOUSE } from "../../constants/api";
import { getApiData } from "../../utils/getApiData";
import { REFS } from "../../constants/root";
import { PAGE_SETTINGS } from "../../constants/pageSettings";
import { newArr } from "../../utils/arrayHelper";
import { tansformSting } from "../../utils/getCamelcaseString";
import Table from "../Table/Table";

import "./FilterButtons.scss";

class FilterButtons {
  async render() {
    const data = await getApiData.getData(API_URL);
    const arrPageSettingsObjects = Object.values(PAGE_SETTINGS);

    const arrayFilterButtonNames =
      getFilterButtonNamesArray(data, arrPageSettingsObjects, "filterButton") ||
      [];
    const buttonsListMarkup = getButtonsListMarkup(arrayFilterButtonNames);

    function getFilterButtonNamesArray(data, arr, param) {
      const arrayFilterButtonNames = [];

      arr.forEach((elelment) => {
        if (elelment.hasOwnProperty(param)) {
          const { filterButton, tableHeader } = elelment;

          if (typeof filterButton !== "boolean") {
            arrayFilterButtonNames.unshift(filterButton);
          } else if (filterButton == true) {
            const key = tableHeader.toLowerCase();
            newArr.addElementToArrayFromDataByKey(
              data,
              arrayFilterButtonNames,
              key
            );
          }
        }
      });

      return arrayFilterButtonNames;
    }

    function getButtonsListMarkup(arrayBtnNames) {
      const buttonsItemsMarkup = arrayBtnNames
        .map(
          (buttonName) => `
                <li class="filter__item">
                    <button class="btn filter__button" data-description="${tansformSting.getCamelcase(
                      buttonName
                    )}">${buttonName}</button>
                </li>`
        )
        .join("");

      return `<ul class="btn filter__list">${buttonsItemsMarkup}</ul>`;
    }

    REFS.filterButtons.innerHTML = `${buttonsListMarkup}`;
  }

  eventListener() {
    const list = document.querySelector(".filter__list");
    let previousDataValue = '';

    list.addEventListener("click", (event) => {
      onButtonClick(event);
    });

    function onButtonClick(event) {
      if (event.target.localName !== "button") {
        return;
      }

      removeActiveClassFommButtons(event);
      toggleActiveClass(event);
      Table.renderBody(getTableDataUrl(event, 'description'));
    }

    function removeActiveClassFommButtons(event) {
      event.currentTarget.querySelectorAll("button").forEach((e) => {
        if (event.target.classList.contains("active")) {
          return;
        }
        e.classList.remove("active");
      });
    }

    function toggleActiveClass(event) {
      event.target.classList.toggle("active");
    }

    function getTableDataUrl (event, attributeName) {
      switch (event.target.dataset[attributeName]) {
        case previousDataValue:
          previousDataValue = '';
          return API_URL;

        case 'allStudents':
          previousDataValue = event.target.dataset[attributeName];
          return API_URL + URL_STUDENTS;

        default:
          previousDataValue = event.target.dataset[attributeName];
          return API_URL + URL_HOUSE + event.target.dataset[attributeName];
      }
    }

  }


}

export default new FilterButtons();
