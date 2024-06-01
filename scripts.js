const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,apparent_temperature,precipitation,cloud_cover,wind_speed_10m&hourly=temperature_2m,precipitation_probability,precipitation,cloud_cover,visibility,wind_speed_120m,wind_direction_120m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,wind_direction_10m_dominant";

const locInput = document.getElementById("locationInput");
const searchBtn = document.getElementById("searchButton");
const locElement = document.getElementById("location");
const tempElement = document.getElementById("temperature");
const descElement = document.getElementById("description");

searchBtn.addEventListener('click', () => {
    const location = locInput;
    if (location){
        getWeather(location);
    }
});

function getWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

}