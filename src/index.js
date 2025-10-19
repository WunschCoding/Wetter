function searchCity(event) {
  event.preventDefault();
  let searchFormInput = document.querySelector("#search-form-input");

  if (searchFormInput.value.length > 2) {
    let city = searchFormInput.value;
    let apiKey = "3412to3ec6a4dfdcbfe0195213b47c9a";
    let units = "metric";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(getWeatherData);

    let apiUrlForecast = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=${units}`;
    axios.get(apiUrlForecast).then(getWeatherForecast);
  } else {
    alert("Please enter at least 3 characters");
  }
  searchFormInput.value = null;
}

function firstCity() {
  let city = "Vienna";
  let apiKey = "3412to3ec6a4dfdcbfe0195213b47c9a";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(getWeatherData);
  let apiUrlForecast = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrlForecast).then(getWeatherForecast);
}

function getWeatherData(response) {
  //console.log(response.data);
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

function getWeatherForecast(response) {
  //console.log(response);
  let actualDay = new Date().getDay();
  let forecastDays = document.querySelectorAll(".weather-forecast-day");

  for (let i = 0; i < forecastDays.length; i++) {
    let forcastDayName = forecastDays[i].querySelector(".forecast-day-name");
    if (actualDay + i <= 6) {
      forcastDayName.innerHTML = dayNumberToDayname(actualDay + i).substring(
        0,
        3
      );
    } else {
      forcastDayName.innerHTML = dayNumberToDayname(0).substring(0, 3);
    }
    let forecastIconDay = forecastDays[i].querySelector(".forecast-icon-day");
    forecastIconDay.src = response.data.daily[i].condition.icon_url;
    let forecastMaxTemperatureDay = forecastDays[i].querySelector(
      ".forecast-max-temperature-day"
    );
    forecastMaxTemperatureDay.innerHTML = Math.round(
      response.data.daily[i].temperature.maximum
    );
    let forecastMinTemperatureDay = forecastDays[i].querySelector(
      ".forecast-min-temperature-day"
    );
    forecastMinTemperatureDay.innerHTML = Math.round(
      response.data.daily[i].temperature.minimum
    );
    //console.log(response.data.daily[i].temperature.minimum);
  }
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

function displayForecast() {
  let forecast = document.querySelector("#forecast");
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `          
          <div class="weather-forecast-day">
            <div class="forecast-day-name">${day}</div>
            <div>
              <img
                class="forecast-icon-day"
                src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png"
                alt="weather-icon"
              />
            </div>
            <div class="forecast-temperature-day">
              <div class="forecast-max-temperature-day">20°</div>
              <div
                class="forecast-min-temperature-day"
              >
                10°
              </div>
            </div>
          </div>
`;
  });
  forecast.innerHTML = forecastHtml;
}

displayForecast();

firstCity();
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);
