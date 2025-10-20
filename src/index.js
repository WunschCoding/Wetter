function searchCity(event) {
  event.preventDefault();
  let searchFormInput = document.querySelector("#search-form-input");

  if (searchFormInput.value.length > 2) {
    startGetData(searchFormInput.value);
  } else {
    alert("Please enter at least 3 characters");
  }
  searchFormInput.value = null;
}

function startGetData(city) {
  let apiKey = "3412to3ec6a4dfdcbfe0195213b47c9a";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(getWeatherData);
  let apiUrlForecast = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrlForecast).then(displayForecast);
}

function getWeatherData(response) {
  let actualCity = document.querySelector("#actual-city");
  actualCity.innerHTML = response.data.city;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.condition.description;
  let humidity = document.querySelector("#humidity") + "%";
  humidity.innerHTML = response.data.temperature.humidity;
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = round(response.data.wind.speed, 1);
  let iconActualWeather = document.querySelector(".icon-actual-weather");
  iconActualWeather.src = response.data.condition.icon_url;
  let actualTemperature = document.querySelector(
    "#temperature-value-actual-weather"
  );
  actualTemperature.innerHTML = Math.round(response.data.temperature.current);
  insertTime();
}

function formatTimestampToDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function round(value, precision) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

function insertTime() {
  let actualTime = new Date();
  let hour = actualTime.getHours();
  let minute = actualTime.getMinutes();
  if (minute < 10) {
    minute = "0" + minute;
  }
  let day = actualTime.getDay();
  let dayName = dayNumberToDayname(day);
  let time = document.querySelector("#time");
  time.innerHTML = `${dayName} ${hour}:${minute}`;
}

function dayNumberToDayname(dayNumber) {
  let dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return dayNames[dayNumber];
}

function displayForecast(response) {
  console.log(response.data);

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `          
          <div class="weather-forecast-day">
            <div class="forecast-day-name">${formatTimestampToDate(
              day.time
            )}</div>
            <div>
              <img
                class="forecast-icon-day"
                src="${day.condition.icon_url}"
                alt="weather-icon"
              />
            </div>
            <div class="forecast-temperature-day">
              <div class="forecast-max-temperature-day">${Math.round(
                day.temperature.maximum
              )}</div>
              <div
                class="forecast-min-temperature-day"
              >
                ${Math.round(day.temperature.minimum)}
              </div>
            </div>
          </div>
`;
    }
  });

  forecast.innerHTML = forecastHtml;
}

startGetData("Vienna");
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);
