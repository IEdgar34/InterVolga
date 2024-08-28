/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/imputs.js":
/*!**********************************!*\
  !*** ./src/js/modules/imputs.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   inputsvalidate: () => (/* binding */ inputsvalidate)
/* harmony export */ });
const inputsvalidate = () => {
  const inputsStateNumber = document.getElementById("statenumber");
  const vehicle = document.getElementById("vehicle");
  const date = document.getElementById("date");
  const fio = document.getElementById("fio");
  const series = document.getElementById("series");
  const number = document.getElementById("number");
  const issuedbywhom = document.getElementById("issuedbywhom");
  const whenissued = document.getElementById("whenissued");
  const send = document.querySelector(".send");
  const inputs = document.querySelectorAll("input");
  let i = 1;
  inputsStateNumber.addEventListener("input", e => vehicleNumber(e));
  vehicle.addEventListener("input", e => setLocalStorage(e));
  date.addEventListener("change", e => setLocalStorageDate(e));
  fio.addEventListener("input", e => userFio(e));
  series.addEventListener("input", e => SeriesNumber(e));
  number.addEventListener("input", e => SeriesNumber(e));
  issuedbywhom.addEventListener("input", e => userFio(e));
  whenissued.addEventListener("input", e => setLocalStorageDate(e));
  send.addEventListener("click", e => sendDate(e));
  function getDateLocalStorage() {
    inputsStateNumber.value = localStorage.getItem("statenumber");
    vehicle.value = localStorage.getItem("vehicle");
    date.value = localStorage.getItem("date");
    fio.value = localStorage.getItem("fio");
    series.value = localStorage.getItem("series");
    number.value = localStorage.getItem("number");
    issuedbywhom.value = localStorage.getItem("issuedbywhom");
    whenissued.value = localStorage.getItem("whenissued");
  }
  getDateLocalStorage();
  const patterns = [/\""/, /^[а-яё]{1}?$/i, /^[а-яё]{1}\d{1}$/i, /^[а-яё]{1}\d{2}$/i, /^[а-яё]{1}\d{3}$/i, /^[а-яё]{1}\d{3}[а-яё]{1}$/i, /^[а-яё]{1}\d{3}[а-яё]{2}$/i, /^[а-яё]{1}\d{3}[а-яё]{2}\d{1}$/i, /^[а-яё]{1}\d{3}[а-яё]{2}\d{2}$/i, /^[а-яё]{1}\d{3}[а-яё]{2}\d{0,3}$/i];
  function vehicleNumber(e) {
    if (e.target.value.length <= 9) {
      if (patterns[e.target.value.length].test(e.target.value)) {
        e.target.value = e.target.value.toUpperCase();
        localStorage.setItem(e.target.name, e.target.value);
      } else if (e.key === "Tab") {
        changeFocus();
      } else {
        e.target.value = e.target.value.slice(0, -1);
        localStorage.setItem(e.target.name, e.target.value);
      }
    } else {
      e.target.value = e.target.value.slice(0, -1);
      localStorage.setItem(e.target.name, e.target.value);
    }
  }
  function setLocalStorage(e) {
    if (/^[а-яё]{1}?/g.test(e.target.value)) {
      localStorage.setItem(e.target.name, e.target.value);
    } else {
      e.target.value = e.target.value.slice(0, -1);
      localStorage.setItem(e.target.name, e.target.value);
    }
  }
  function setLocalStorageDate(e) {
    localStorage.setItem(e.target.name, e.target.value);
  }
  function userFio(e) {
    if (!/\d/g.test(e.target.value)) {
      localStorage.setItem(e.target.name, e.target.value);
    } else {
      e.target.value = e.target.value.slice(0, -1);
      localStorage.setItem(e.target.name, e.target.value);
    }
  }
  function SeriesNumber(e) {
    if (e.target.name === "series") {
      c(4, e);
    } else if (e.target.name === "number") {
      c(6, e);
    }
    function c(n, e) {
      if (/\d/g.test(e.target.value) && e.target.value.length <= n) {
        localStorage.setItem(e.target.name, e.target.value);
      } else {
        e.target.value = e.target.value.slice(0, -1);
        localStorage.setItem(e.target.name, e.target.value);
      }
    }
  }

  //
  const formOpen = document.querySelector(".form__link");
  const formClose = document.querySelector(".form__close");
  const formCloseBtn = document.querySelector(".form__closebtn");
  const formWrap = document.querySelector(".form");
  const form = document.querySelector("form");
  const wrapper = document.querySelector(".wrapper");
  formOpen.addEventListener("click", e => {
    formWrap.classList.add("form_active");
    wrapper.style.overflow = "hidden";
  });
  formClose.addEventListener("click", e => formCloseF());
  formCloseBtn.addEventListener("click", e => formCloseF());
  function formCloseF() {
    formWrap.classList.remove("form_active");
    wrapper.style.overflow = "";
  }
  //
  function sendDate(e) {
    e.preventDefault();
    if (inputsStateNumber.value.length < 7) {
      err(inputsStateNumber);
    } else if (vehicle.value === "") {
      err(vehicle);
    } else if (date.value.length < 9) {
      err(date);
    } else if (fio.value === "") {
      err(fio);
    } else if (series.value.length < 4) {
      err(series);
    } else if (number.value.length < 6) {
      err(number);
    } else if (issuedbywhom.value === "") {
      err(issuedbywhom);
    } else if (whenissued.value.length < 9) {
      err(whenissued);
    } else {
      const data = new FormData(form);
      localStorage.setItem("data", data);
      inputs.forEach(item => {
        item.value = "";
      });
      localStorage.setItem("statenumber", "");
      localStorage.setItem("vehicle", "");
      localStorage.setItem("date", "");
      localStorage.setItem("fio", "");
      localStorage.setItem("series", "");
      localStorage.setItem("number", "");
      localStorage.setItem("issuedbywhom", "");
      localStorage.setItem("whenissued", "");
    }
  }
  function err(inputSelector) {
    inputSelector.style.border = "2px solid red";
    setTimeout(() => inputSelector.style.border = "1px solid black", 1000);
  }
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_imputs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/imputs */ "./src/js/modules/imputs.js");

document.addEventListener("DOMContentLoaded", () => {
  (0,_modules_imputs__WEBPACK_IMPORTED_MODULE_0__.inputsvalidate)();
});
/******/ })()
;
//# sourceMappingURL=script.js.map