const apikey = "c4807c0ad238303da16d65ce42155603";
const inputBox = document.getElementById("city-search");
const formEl = document.querySelector("form");
const weatherMainEl = document.getElementById("weather-main");

formEl.addEventListener("submit",(event)=> {
    console.log("submit");
    event.preventDefault();
    const cityValue = inputBox.value;
    console.log(cityValue);
    getWeatherData(cityValue);
});

async function getWeatherData(cityValue){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`);
        if(!response.ok)
        {
            throw new Error("Network response was not ok")
        }
        const data = await response.json();
        console.log(data);
        displayResponse(data);
    } catch (error) {
        weatherMainEl.querySelector(".weather-status").innerHTML = "Try again later";
        weatherMainEl.querySelector(".icon").innerHTML = ``
        weatherMainEl.querySelector(".degree").textContent = '';
        weatherMainEl.querySelector(".weather-info-main").innerHTML = ``
    }
}

function displayResponse(data)
{
    const temperature = Math.round(data.main.temp);
    console.log(temperature);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon
    console.log(description);
    weatherMainEl.querySelector(".icon").innerHTML = `<img src=" https://openweathermap.org/img/wn/${icon}@2x.png" alt=""></img>`
    weatherMainEl.querySelector(".degree").textContent = temperature;
    weatherMainEl.querySelector(".weather-status").innerHTML = description;
    weatherMainEl.querySelector(".weather-info-main").innerHTML = `<div class="feels box">Feels like: ${data.main.feels_like}</div>
    <div class="humidity box">Humidity: ${data.main.humidity}</div>
    <div class="speed box">Wind speed: ${data.wind.speed} m/s</div>`
}