const locInput = document.getElementById("locationInput");
const searchBtn = document.getElementById("searchButton");
let locElement = document.getElementById("location");
let tempElement = document.getElementById("temperature");
let descElement = document.getElementById("description");

searchBtn.addEventListener('click', async () => {
    const location = locInput.value;
    if (location){
        let coords = await getCoords(location);
        const coordinates = coords.geometry.location;
        const weatherdata = await getWeather(coordinates.lng, coordinates.lat);
        console.log(weatherdata);
        const dailyVars = weatherdata.daily;
        const hourlyVars = weatherdata.hourly;
        
        const sunrise = dailyVars.sunrise[0].split("T");
        const sunset = dailyVars.sunset[0].split("T");
        const tempMax = dailyVars.temperature_2m_max[0];
        const tempMin = dailyVars.temperature_2m_min[0];
        const uvIndex = dailyVars.uv_index_max[7];
        const precipitationHours = dailyVars.precipitation_hours[0];

        const cloudCover = hourlyVars.cloud_cover;
        const precProb = hourlyVars.precipitation_probability;
        const pressure = hourlyVars.pressure_ms1;
        const windDir = hourlyVars.wind_direction_120m;
        const windSpeed = hourlyVars.wind_speed_120m;
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
    return data.results[0];
} 

async function getWeather(longitude, latitude) {
    const params = {
        "latitude": latitude,
        "longitude": longitude,
        "hourly": ["precipitation_probability", "precipitation", "snow_depth", "pressure_msl", "cloud_cover", "wind_speed_180m", "wind_direction_120m", "temperature_120m"],
        "daily": ["weather_code", "sunrise", "sunset", "uv_index_max", "precipitation_hours"],
        "forecast_days": 1
    };

    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature,precipitation_probability,precipitation,snow_depth,pressure_msl,cloud_cover,wind_speed_180m,wind_direction_120m&daily=temperature_2m_max,temperature_2m_min,weather_code,sunrise,sunset,uv_index_max,precipitation_hours&forecast_days=1`, {
        method: 'GET',
        params: params
      });
    return response.json();
}