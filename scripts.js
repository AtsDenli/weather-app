const locInput = document.getElementById("locationInput");
const searchBtn = document.getElementById("searchButton");

const currentTime = new Date();

const year = currentTime.getFullYear();
const month = currentTime.getMonth() + 1;
const day = currentTime.getDate();
const hour = currentTime.getHours();

let tomorrow = false;
if (hour >= 19){
    tomorrow = true;
}

searchBtn.addEventListener('click', async () => {
    const location = locInput.value;
    if (location){
        let coords = await getCoords(location);
        const coordinates = coords.geometry.location;
        const weatherdata = await getWeather(coordinates.lng, coordinates.lat);
        console.log(weatherdata);
        const dailyVars = weatherdata.daily;
        const hourlyVars = weatherdata.hourly;
        
        let sunrise = '';
        let sunset = '';
        let tempMax = 0;
        let tempMin = 0;
        let uvIndex = 0;
        let precipitationHours = 0;

        if (!tomorrow) {
            sunrise = dailyVars.sunrise[0].split("T")[1] ;
            sunset = dailyVars.sunset[0].split("T")[1];
            tempMax = dailyVars.temperature_2m_max[0];
            tempMin = dailyVars.temperature_2m_min[0];
            uvIndex = dailyVars.uv_index_max[0];
            precipitationHours = dailyVars.precipitation_hours[0];
        } else {
            sunrise = dailyVars.sunrise[1].split("T")[1];
            sunset = dailyVars.sunset[1].split("T")[1];
            tempMax = dailyVars.temperature_2m_max[1];
            tempMin = dailyVars.temperature_2m_min[1];
            uvIndex = dailyVars.uv_index_max[1];
            precipitationHours = dailyVars.precipitation_hours[1];
        }

        const cloudCover = hourlyVars.cloud_cover;

        updatePage(sunrise, sunset, tempMax, tempMin, uvIndex, precipitationHours, cloudCover);
    }
});

async function getCoords(location) {
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=AIzaSyBrm_dtI4sWXrY0NwK_WY7yl-NCU1BurEI`;
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
        "hourly": ["cloud_cover"],
        "daily": ["weather_code", "sunrise", "sunset", "uv_index_max", "precipitation_hours"],
        "forecast_days": 1
    };

    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=cloud_cover&daily=temperature_2m_max,temperature_2m_min,weather_code,sunrise,sunset,uv_index_max,precipitation_hours&forecast_days=2`, {
        method: 'GET',
        params: params
      });
    return response.json();
}

function updatePage(sunrise, sunset, tempMax, tempMin, uvIndex, precipitationHours, cloudCover){
    document.getElementById("sunrise").innerHTML = `Sunrise at: ${sunrise}`;
    document.getElementById("sunset").innerHTML = `Sunset at: ${sunset}`;
    document.getElementById("temp").innerHTML = `Temperature range: ${tempMin} - ${tempMax}`;
    document.getElementById("uv").innerHTML = `UV Index ${uvIndex}`;
    document.getElementById("precipitation").innerHTML = `Hours of precipitation: ${precipitationHours}`;

    const body = document.body;

    if (precipitationHours > 13){
        body.style.backgroundImage = "url('images/rainy.jpg')";
    } else if (cloudCover[hour] > 50){
        body.style.backgroundImage = "url('images/cloudy.jpg')";
    } else {
        body.style.backgroundImage = "url('images/sunny.jpg')";
    }
}