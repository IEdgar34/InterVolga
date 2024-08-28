export const inputsvalidate = () => {
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
	inputsStateNumber.addEventListener("keydown", (e) => vehicleNumber(e));
	vehicle.addEventListener("keydown", (e) => setLocalStorage(e));
	date.addEventListener("change", (e) => setLocalStorageDate(e));
	fio.addEventListener("keydown", (e) => userFio(e));
	series.addEventListener("keydown", (e) => SeriesNumber(e));
	number.addEventListener("keydown", (e) => SeriesNumber(e));
	issuedbywhom.addEventListener("keydown", (e) => userFio(e));
	whenissued.addEventListener("keydown", (e) => dateNumber(e));
	send.addEventListener("click", (e) => sendDate(e));

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
	const patterns = [
		/^[а-яё]?$/i,
		/^[а-яё]\d{0,1}$/i,
		/^[а-яё]\d{0,2}$/i,
		/^[а-яё]\d{0,3}$/i,
		/^[а-яё]\d{3}[а-яё]?$/i,
		/^[а-яё]\d{3}[а-яё]{1,2}$/i,
		/^[а-яё]\d{3}[а-яё]{2}\d?$/i,
		/^[а-яё]\d{3}[а-яё]{2}\d{1,2}$/i,
		/^[а-яё]\d{3}[а-яё]{2}\d{1,3}$/i,
	];

	const patNumber = [
		/^\d{1}?$/i,
		/^\d{2}$/i,
		/^\d{2}\.$/i,
		/^\d{2}\.\d{1}$/i,
		/^\d{2}\.\d{2}?$/i,
		/^\d{2}\.\d{2}\.$/i,
		/^\d{2}\.\d{2}\.\d{1}?$/i,
		/^\d{2}\.\d{2}\.\d{2}$/i,
		/^\d{2}\.\d{2}\.\d{3}$/i,
		/^\d{2}\.\d{2}\.\d{4}$/i,
	];

	function vehicleNumber(e) {
		e.preventDefault();

		//допускаем только фицры и буквы
		if (e.keyCode >= 48 && e.keyCode <= 90 && e.target.value.length < 9) {
			e.target.value += e.key;

			if (!patterns[e.target.value.length - 1].test(e.target.value)) {
				e.target.value = e.target.value.slice(0, -1);
			}
			localStorage.setItem(e.target.name, e.target.value);
		} else if (e.keyCode === 8) {
			e.target.value = e.target.value.slice(0, -1);
			localStorage.setItem(e.target.name, e.target.value);
		} else if (e.key === "Tab") {
			changeFocus();
		}
	}
	function setLocalStorage(e) {
		e.preventDefault();

		if (e.keyCode >= 48 && e.keyCode <= 90) {
			e.target.value += e.key;
			localStorage.setItem(e.target.name, e.target.value);
		} else if (e.keyCode === 8) {
			e.target.value = e.target.value.slice(0, -1);
			localStorage.setItem(e.target.name, e.target.value);
		} else if (e.keyCode === 32) {
			e.target.value += " ";
			localStorage.setItem(e.target.name, e.target.value);
		} else if (e.key === "Tab") {
			changeFocus();
		}
	}

	function setLocalStorageDate(e) {
		localStorage.setItem(e.target.name, e.target.value);
		if (e.key === "Tab") {
			changeFocus();
		}
	}
	function userFio(e) {
		e.preventDefault();

		if (e.keyCode >= 65 && e.keyCode <= 90) {
			e.target.value += e.key;
			localStorage.setItem(e.target.name, e.target.value);
		} else if (e.keyCode === 8) {
			e.target.value = e.target.value.slice(0, -1);
			localStorage.setItem(e.target.name, e.target.value);
		} else if (e.keyCode === 32) {
			e.target.value += " ";
			localStorage.setItem(e.target.name, e.target.value);
		} else if (e.key === "Tab") {
			changeFocus();
		}
	}
	function SeriesNumber(e) {
		e.preventDefault();

		if (e.target.name === "series") {
			c(4, e);
		} else if (e.target.name === "number") {
			c(6, e);
		}

		function c(n, e) {
			if (
				e.keyCode >= 49 &&
				e.keyCode <= 57 &&
				e.target.value.length < n
			) {
				e.target.value += e.key;
				localStorage.setItem(e.target.name, e.target.value);
			} else if (e.keyCode === 8) {
				e.target.value = e.target.value.slice(0, -1);
				localStorage.setItem(e.target.name, e.target.value);
			} else if (e.key === "Tab") {
				changeFocus();
			}
		}
	}
	function dateNumber(e) {
		e.preventDefault();
		if (e.keyCode >= 49 && e.keyCode <= 57 && e.target.value.length < 10) {
			e.target.value += e.key;

			if (!patNumber[e.target.value.length - 1].test(e.target.value)) {
				e.target.value = e.target.value.slice(0, -1);
				e.target.value += ".";
			}
			localStorage.setItem(e.target.name, e.target.value);
		} else if (e.keyCode === 8) {
			e.target.value = e.target.value.slice(0, -1);
			localStorage.setItem(e.target.name, e.target.value);
		} else if (e.key === "Tab") {
			changeFocus();
		}
	}

	function changeFocus() {
		if (inputs[i + 1]) {
			inputs[i + 1].focus();
		}
	}
	inputs.forEach((item) => {
		item.addEventListener("focus", (e) => {
			i = Array.from(inputs).indexOf(e.target);
			console.log(i);
		});
	});
	//
	const formOpen = document.querySelector(".form__link");
	const formClose = document.querySelector(".form__close");
	const formCloseBtn = document.querySelector(".form__closebtn");
	const formWrap = document.querySelector(".form");
	const form = document.querySelector("form");

	formOpen.addEventListener("click", (e) => {
		formWrap.classList.add("form_active");
	});
	formClose.addEventListener("click", (e) => formCloseF());
	formCloseBtn.addEventListener("click", (e) => formCloseF());
	function formCloseF() {
		formWrap.classList.remove("form_active");
	}
	//
	function sendDate(e) {
		e.preventDefault();
		if (inputsStateNumber.value.length < 7) {
			err(inputsStateNumber);
		}
		if (vehicle.value === "") {
			err(vehicle);
		}
		if (date.value.length < 9) {
			err(date);
		}
		if (fio.value === "") {
			err(fio);
		}
		if (series.value.length < 4) {
			err(series);
		}
		if (number.value.length < 6) {
			err(number);
		}
		if (issuedbywhom.value === "") {
			err(issuedbywhom);
		}
		if (whenissued.value.length < 10) {
			err(whenissued);
		} else {
			const data = new FormData(form);
			localStorage.setItem("date", data);
			inputs.forEach((item) => {
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
		setTimeout(
			() => (inputSelector.style.border = "1px solid black"),
			1000
		);
	}
};
