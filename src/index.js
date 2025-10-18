function searchCity(event) {
  event.preventDefault();
  let searchFormInput = document.querySelector("#search-form-input");
  let actualCity = document.querySelector("#actual-city");
  if (searchFormInput.value.length > 2) {
    actualCity.innerHTML = searchFormInput.value;
  } else {
    alert("Please enter at least 3 characters");
  }
  searchFormInput.value = null;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);
