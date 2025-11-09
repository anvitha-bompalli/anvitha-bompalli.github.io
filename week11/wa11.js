const API_KEY = "0137328857e384bec545718d4749db31";
const weatherDiv = document.getElementById("weatherResult");
const errorDiv = document.getElementById("error");
const privacySelect = document.getElementById("privacy");
const manualInput = document.getElementById("manualInput");

document.getElementById("getWeather").addEventListener("click", handlePrivacyChoice);
document.getElementById("searchCity").addEventListener("click", () => {
  const city = document.getElementById("cityName").value.trim();
  if (city) fetchWeatherByCity(city);
});

privacySelect.addEventListener("change", () => {
  manualInput.style.display = privacySelect.value === "manual" ? "block" : "none";
});

function handlePrivacyChoice() {
  const choice = privacySelect.value;
  errorDiv.textContent = "";
  weatherDiv.innerHTML = "Loading...";

  if (choice === "precise") {
    if (!navigator.geolocation) {
      showError("Your browser doesn't support location access.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      pos => fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude),
      err => showError("Location access denied or unavailable.")
    );
  } else if (choice === "city") {
    const city = prompt("Enter your city name:");
    if (city) fetchWeatherByCity(city);
    else weatherDiv.innerHTML = "";
  } else if (choice === "manual") {
    manualInput.style.display = "block";
  }
}

async function fetchWeatherByCoords(lat, lon) {
  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
    if (!res.ok) throw new Error("Weather data not found");
    const data = await res.json();
    displayWeather(data);
  } catch (err) {
    showError(err.message);
  }
}

async function fetchWeatherByCity(city) {
  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`);
    if (!res.ok) throw new Error("City not found or API issue");
    const data = await res.json();
    displayWeather(data);
  } catch (err) {
    showError(err.message);
  }
}

function displayWeather(data) {
  const icon = data.weather[0].icon;
  weatherDiv.innerHTML = `
    <h2>${data.name}</h2>
    <p>${data.weather[0].description}</p>
    <p>🌡️ ${data.main.temp} °C</p>
    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="weather icon">
  `;
}

function showError(message) {
  weatherDiv.innerHTML = "";
  errorDiv.textContent = message;
}

