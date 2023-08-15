const submit = document.querySelector(".submit");
const displayContainer = document.querySelector(".weather-display-container");
const closeModal = document.querySelector(".close");
const modal = document.querySelector("#modal-overlay");
async function getWeatherData(input) {
	try {
		const response = await fetch(
			`https://api.weatherapi.com/v1/current.json?key=5bb4272164334fcc847192103231408&q=${input}`
		);
		const data = await response.json();
		const requiredData = {
			city: data.location.name,
			country: data.location.country,
			temp_c: data.current.temp_c,
			feelslike_c: data.current.feelslike_c,
			temp_f: data.current.temp_f,
			feelslike_f: data.current.feelslike_f,
			condition: data.current.condition.text,
			condition_icon: data.current.condition.icon,
			humidity: data.current.humidity,
			wind_kph: data.current.wind_kph,
		};
		return requiredData;
	} catch (error) {
		modal.style.display = "flex";
		closeModal.addEventListener("click", () => {
			modal.style.display = "none";
		});
	}
}

// let london = getWeatherData("london")

async function displayData(input) {
	const data = await getWeatherData(input);
	console.log(data);
	if (document.querySelector(".weather-display") && data !== undefined) {
		displayContainer.removeChild(
			document.querySelector(".weather-display")
		);
	}
	const weatherDisplay = document.createElement("div");
	weatherDisplay.classList.add("weather-display");

	const headerContent = document.createElement("p");
	headerContent.classList.add("weather-header");
	headerContent.textContent = `${data.city}, ${data.country}`;
	weatherDisplay.appendChild(headerContent);

	const weatherCondition = document.createElement("p");
	weatherCondition.classList.add("condition");
	weatherCondition.textContent = data.condition;

	const conditionIcon = document.createElement("img");
	conditionIcon.src = data.condition_icon;
	weatherCondition.appendChild(conditionIcon);
	weatherDisplay.appendChild(weatherCondition);

	const weather = document.createElement("p");
	weather.classList.add("weather");
	weather.textContent = data.temp_c + " \u00B0C";
	weatherDisplay.appendChild(weather);

	const feelsLike = document.createElement("p");
	feelsLike.classList.add("rest-of-info");
	feelsLike.textContent = `Feels like: ${data.feelslike_c} \u00B0C`;
	weatherDisplay.appendChild(feelsLike);

	const humidity = document.createElement("p");
	humidity.classList.add("rest-of-info");
	humidity.textContent = `Humidity: ${data.humidity} %`;
	weatherDisplay.appendChild(humidity);

	const wind = document.createElement("p");
	wind.classList.add("rest-of-info");
	wind.textContent = `Wind: ${data.wind_kph} km/h`;
	weatherDisplay.appendChild(wind);

	displayContainer.append(weatherDisplay);
}

submit.addEventListener("click", async (e) => {
	const searchInput = document.querySelector("#input");
	e.preventDefault();
	await displayData(searchInput.value);
	searchInput.value = "";
});
