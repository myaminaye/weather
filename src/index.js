let now = new Date();

let currentTime = document.querySelector("#currentDateTime");

let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];
currentTime.innerHTML = `${days[now.getDay()]
    }, ${now.getHours()}:${now.getMinutes()}`;

//--------------------------------------

function showCurrent() {
    console.log("button click");
    navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

let currentBtn = document.querySelector("button");
currentBtn.addEventListener("click", showCurrent);

function getCityName(lat, lng) {
    const apiKey = "AIzaSyA9Zz5oJEqKPUOCvPbZiiyKf74vEj0C5j8";
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

    return axios.get(apiUrl).then((response) => {
        const results = response.data.results;
        console.log(results);
        let city = "";

        for (let i = 0; i < results.length; i++) {
            if (results[i].types[0] === "locality") {
                city = results[i].address_components[0].long_name;
                break;
            }
        }

        return city;
    });
}

function showCurrentLocation(position) {
    let lat = position.coords.latitude;
    let long = position.coords.latitude;
    console.log(long, lat);
    function display(response) {
        let heading = document.querySelector("h1");
        let temp = Math.round(response.data.main.temp);
        heading.innerHTML = `${temp} °C`;

        let city = document.querySelector("#displayedCity");
        // let cityName = getCityName(lat, long);
        // city.innerHTML = `${cityName}`;
        city.innerHTML = "Your current location";

        let conditionTemp = document.querySelector("#condition");
        let humidityTemp = document.querySelector("#humidity");
        let windTemp = document.querySelector("#wind");

        let weather = response.data.weather[0].main;
        let humidity = response.data.main.humidity;
        let wind = response.data.wind.speed;

        conditionTemp.innerHTML = `${weather}`;
        humidityTemp.innerHTML = `Humidity: ${humidity}`;
        windTemp.innerHTML = `Wind: ${wind} km/h`;
    }
    const apiKey = "8c78e9e7e9928cd1a2a6f923072c3dec";

    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(display);
}

// -------------------------------------------

function changeTemp(response) {
    let displayedTemp = document.querySelector("h1");
    let conditionTemp = document.querySelector("#condition");
    let humidityTemp = document.querySelector("#humidity");
    let windTemp = document.querySelector("#wind");

    let specificTemp = response.data.main.temp;
    let weather = response.data.weather[0].main;
    let humidity = response.data.main.humidity;
    let wind = response.data.wind.speed;

    conditionTemp.innerHTML = `${weather}`;
    displayedTemp.innerHTML = `${specificTemp}°C`;
    humidityTemp.innerHTML = `Humidity: ${humidity}`;
    windTemp.innerHTML = `Wind: ${wind} km/h`;
}
function clickSearch(event) {
    event.preventDefault();
    let showCity = document.querySelector("#displayedCity");
    let userCity = document.querySelector("#city-input");
    showCity.innerHTML = `${userCity.value}`;
    const apiKey = "8c78e9e7e9928cd1a2a6f923072c3dec";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${userCity.value}&appid=${apiKey}&units=metric`;
    axios.get(url).then(changeTemp);
}

let form = document.querySelector("form");
form.addEventListener("click", clickSearch);
