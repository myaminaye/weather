function displayTemperature(response){
    console.log(response.data)
    let temperatureElement = document.getElementById("temperature");
    let cityElement = document.getElementById("city");
    let descriptionElement = document.getElementById("description");
    let humidityElement = document.getElementById("humidity");
    let windElement = document.getElementById("wind");
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "085471793943e047acaad88b8e636154";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`

axios.get(apiUrl).then(displayTemperature);