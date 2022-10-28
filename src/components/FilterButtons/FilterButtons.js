import { API_URL, URL_STUDENTS, URL_HOUSE } from "../../constants/api";
import { getApiData } from "../../utils/getApiData";
import { REFS } from "../../constants/root";
import { PAGE_SETTINGS } from "../../constants/pageSettings";
import { newArr } from "../../utils/arrayHelper";
import { getCamelcaseString } from "../../utils/getCamelcaseString";

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
          } else if (filterButton != false) {
            const key = tableHeader.toLowerCase();
            newArr.addElementToArrayFromDataByKey(
              data,
              arrayFilterButtonNames,
              key
            );
          }

          // typeof(filterButton) !== "boolean"
          // ? arrayFilterButtonNames.unshift(filterButton)
          // : filterButton != false
          // ? newArr.addElementToArrayFromDataByKey(data, arrayFilterButtonNames, tableHeader.toLowerCase())
          // : false;
        }
      });

      return arrayFilterButtonNames;
    }

    function getButtonsListMarkup(arrayBtnNames) {
      const buttonsItemsMarkup = arrayBtnNames
        .map(
          (buttonName) => `
                <li class="filter__item">
                    <button class="btn filter__button" data-description="${getCamelcaseString(buttonName)}">${buttonName}</button>
                </li>`
        )
        .join("");

      return `<ul class="btn filter__list">${buttonsItemsMarkup}</ul>`;
    }

    REFS.filterButtons.innerHTML = `${buttonsListMarkup}`;
  }
  eventListener() {
    const list = document.querySelector(".filter__list");

    list.addEventListener("click", (event) => {
      onButtonClick(event);
    });

    function onButtonClick(event) {
      if (event.target.localName === "button") {
        removeActiveClassFommButtons(event);
        toggleActiveClass(event);

        return;
      }
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
  }
}

export default new FilterButtons();
