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
        console.log("Coords received");
        console.log(coords); 
        longitude = coords[0][2][1][1];
        latitude = coords[0][2][1][0]; 
        weatherdata = await getWeather(longitude,latitude);
        console.log(weatherdata);
        console.log("Achieved");
    }
});

async function getCoords(location) {
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=AIzaSyBrm_dtI4sWXrY0NwK_WY7yl-NCU1BurEI`;
    //const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(apiUrl)}`);
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Network response was not ok.');
    }
    const data = await response.json();
    return data;
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