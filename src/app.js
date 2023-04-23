function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`
}

function displayTemperature(response) {
    console.log(response.data)
    let temperatureElement = document.getElementById("temperature");
    let cityElement = document.getElementById("city");
    let descriptionElement = document.getElementById("description");
    let humidityElement = document.getElementById("humidity");
    let windElement = document.getElementById("wind");
    let dateElement = document.getElementById("date");
    let iconElement = document.getElementById("icon");

    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);
}

let apiKey = "085471793943e047acaad88b8e636154";
let city = "Myanmar";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

axios.get(apiUrl).then(displayTemperature);