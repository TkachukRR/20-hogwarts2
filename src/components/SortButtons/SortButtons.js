import { PAGE_SETTINGS } from "../../constants/pageSettings";
import { REFS } from "../../constants/root";

class SortButtons {
  async addToElemets() {
    const dataAttributesArray = getDataAttributesArray(
      PAGE_SETTINGS,
      "sortButton"
    );
    const pageElementsByAttributeArray = getPageElementsByAttributeArray(
      REFS.pageTable,
      dataAttributesArray
    );

    pageElementsByAttributeArray.forEach((element) => {
      const btnSortMarkup = `<button class="btn__sort" data-description="noSorted">⇕</button>`;
      element.insertAdjacentHTML("beforeend", btnSortMarkup);
    });

    function getPageElementsByAttributeArray(pageEl, dataAttributesArray) {
      let arryElenetsWithAttribute = [];
      dataAttributesArray.forEach((dataAttribute) => {
        arryElenetsWithAttribute.push(
          pageEl.querySelector(`[data-th-name=${dataAttribute}]`)
        );
      });
      return arryElenetsWithAttribute;
    }

    function getDataAttributesArray(obj, attribute) {
      let arryAttributes = [];
      for (const key in obj) {
        if (PAGE_SETTINGS[key][attribute]) {
          arryAttributes.push(key);
        }
      }
      return arryAttributes;
    }
  }

  eventListener() {
    const sortButtonsParent = REFS.pageTable.querySelector('.table__header')
    // = Array.from(document.querySelectorAll('button.btn__sort'));
    console.log(sortButtonsParent)

    sortButtonsParent.addEventListener("click", (event) => {
        onSortButtonClick(event);
      });


    function onSortButtonClick(event) {
        if (event.target.localName !== "button") {
            return;
          }
        console.log( event.target.dataset.description)
        console.log( event.target.textContent)

        let direction = event.target.dataset.description;
  
        if (direction === "noSorted") {
          event.target.textContent = "⇓";
          event.target.dataset.description = "increment";
        }
  
        if (direction === "increment") {
          event.target.textContent = "⇑";
          event.target.dataset.description = "decrement";
        }
  
        if (direction === "decrement") {
          event.target.textContent = "⇕";
          event.target.dataset.description = "noSorted";
        }

        // console.log('onSortButtonClick', event.target.getAttribute('description') )
    }
  }
}

export default new SortButtons();
