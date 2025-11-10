const apiKey = "0137328857e384bec545718d4749db31";
const weatherInfo = document.getElementById("weather-info");
const fetchBtn = document.getElementById("fetch-weather");
const privacyOption = document.getElementById("location-option");

fetchBtn.addEventListener("click", () => {
  const choice = privacyOption.value;

  if (!choice) {
    weatherInfo.textContent = "Please select a location option first.";
    return;
  }

  if (choice === "manual") {
    const city = prompt("Enter the city name:");
    if (city) {
      fetchWeatherByCity(city.trim());
    } else {
      weatherInfo.textContent = "City name not provided.";
    }
  } else if (choice === "precise") {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successPrecise, geoError);
    } else {
      weatherInfo.textContent = "Geolocation not supported by your browser.";
    }
  } else if (choice === "city") {
    // Approximate by asking for the nearest large city name (more privacy)
    const approxCity = prompt("Enter any city:");
    if (approxCity) {
      fetchWeatherByCity(approxCity.trim());
    } else {
      weatherInfo.textContent = "City name not provided.";
    }
  }
});

function successPrecise(position) {
  const { latitude, longitude } = position.coords;
  fetchWeatherByCoords(latitude, longitude);
}

function geoError() {
  weatherInfo.textContent = "Could not get your location.";
}

function fetchWeatherByCoords(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  getWeather(url);
}

function fetchWeatherByCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  getWeather(url);
}

function getWeather(url) {
  weatherInfo.textContent = "Fetching weather...";
  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error("Weather data not available");
      return res.json();
    })
    .then((data) => {
      const { name, main, weather } = data;
      weatherInfo.innerHTML = `
        <div><strong>${name}</strong></div>
        <div>Temperature: ${main.temp}°C</div>
        <div>Condition: ${weather[0].description}</div>
        <div>Humidity: ${main.humidity}%</div>
      `;
    })
    .catch(() => {
      weatherInfo.textContent = "Failed to fetch weather data. Try again.";
    });
}
