import {fetchWeaterApi} from "openmeteo";

const MeteoAPI = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=precipitation_probability,precipitation,snow_depth,pressure_msl,cloud_cover,wind_speed_180m,wind_direction_120m,temperature_120m&daily=weather_code,sunrise,sunset,uv_index_max,precipitation_hours&forecast_days=3";
const ninjaKey = "pOzxPTnz6MSO+YzorwluVw==e8TWqqZhFZWGU5KS";

const locInput = document.getElementById("locationInput");
const searchBtn = document.getElementById("searchButton");
const locElement = document.getElementById("location");
const tempElement = document.getElementById("temperature");
const descElement = document.getElementById("description");

searchBtn.addEventListener('click', () => {
    const location = locInput;
    if (location){
        coords = getCoords(location);
        longitude = coords[0];
        latitude = coords[1];
    }
});

function getCoords(location) {
    $.ajax({
        method: 'GET',
        url: `https://api.api-ninjas.com/v1/geocoding?city=${location}`,
        headers: {'X-Api-Key': ninjaKey},
        contentType: "application/json",
        success: function(result) {
            var json = JSON.parse(result);
            return([json["longitude"], json["latitude"]]);
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    })
}

function getWeather(longitude, latitude) {
    const params = {
        "latitude": latitude,
        "longitude": longitude,
        "hourly": ["precipitation_probability", "precipitation", "snow_depth", "pressure_msl", "cloud_cover", "wind_speed_180m", "wind_direction_120m", "temperature_120m"],
        "daily": ["weather_code", "sunrise", "sunset", "uv_index_max", "precipitation_hours"],
        "forecast_days": 3
    };
}