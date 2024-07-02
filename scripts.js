const locInput = document.getElementById("locationInput");
const searchBtn = document.getElementById("searchButton");
const locElement = document.getElementById("location");
const tempElement = document.getElementById("temperature");
const descElement = document.getElementById("description");

searchBtn.addEventListener('click', async () => {
    const location = locInput.value;
    console.log("button clicked");
    if (location){
        coords = await getCoords(location);
        longitude = coords[0];
        latitude = coords[1]; 
        weatherdata = await getWeather(longitude,latitude);
        console.log(weatherdata);
        console.log("Achieved");
    }
});

async function getCoords(location) {
    try {
        const response = await fetch(`https://api.opencage.com/geocode/v1/json?q=${location}&key=965df24d09904329882d759f3737938d`);
        const data = await response.json();
        return [data.results[0].geometry.lng, data.results[0].geometry.lat];
    }
    catch (error) {
        console.log(error);
        console.log("Geocoding API failed");
    }
}

async function getWeather(longitude, latitude) {
    const params = {
        "latitude": latitude,
        "longitude": longitude,
        "hourly": ["precipitation_probability", "precipitation", "snow_depth", "pressure_msl", "cloud_cover", "wind_speed_180m", "wind_direction_120m", "temperature_120m"],
        "daily": ["weather_code", "sunrise", "sunset", "uv_index_max", "precipitation_hours"],
        "forecast_days": 1
    };

    console.log("getting weather")
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=precipitation_probability,precipitation,snow_depth,pressure_msl,cloud_cover,wind_speed_180m,wind_direction_120m,temperature_120m&daily=weather_code,sunrise,sunset,uv_index_max,precipitation_hours&forecast_days=1`, {
        method: 'GET',
        params: params
      });
    return response.json();
}