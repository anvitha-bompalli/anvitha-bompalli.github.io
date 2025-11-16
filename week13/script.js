document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "0137328857e384bec545718d4749db31"; // Your API key
  const weatherWidget = document.getElementById("weather-widget");

  // --- Function to fetch weather on page load ---
  function initWeather() {
    if (navigator.geolocation) {
      // Try to get precise location
      navigator.geolocation.getCurrentPosition(successPrecise, geoError);
    } else {
      // Geolocation not supported, use fallback
      weatherWidget.textContent = "Geolocation not supported. Fetching default weather.";
      fetchWeatherByCity("Boulder");
    }
  }

  // --- Geolocation Success ---
  function successPrecise(position) {
    const { latitude, longitude } = position.coords;
    fetchWeatherByCoords(latitude, longitude);
  }

  // --- Geolocation Error (or user denied) ---
  function geoError() {
    weatherWidget.textContent = "Could not get your location. Fetching weather for Boulder.";
    // Fallback to a default city
    fetchWeatherByCity("Boulder");
  }

  // --- Fetch by Coords ---
  function fetchWeatherByCoords(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    getWeather(url);
  }

  // --- Fetch by City Name ---
  function fetchWeatherByCity(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    getWeather(url);
  }

  // --- Main Get Weather Function ---
  function getWeather(url) {
    weatherWidget.innerHTML = "<p>Fetching weather...</p>";
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Weather data not available");
        return res.json();
      })
      .then((data) => {
        displayWeather(data);
      })
      .catch((error) => {
        weatherWidget.textContent = "Failed to fetch weather data. Please try again.";
        console.error(error);
      });
  }

  // --- Display Weather (This is where the critique happens!) ---
  function displayWeather(data) {
    const { name, main, weather } = data;
    const temp = Math.round(main.temp);
    const description = weather[0].description;

    // This is the custom message from your proposal
    weatherWidget.innerHTML = `
      <h3>Time for a break?</h3>
      <p>It's currently <strong>${temp}°C</strong> and <strong>${description}</strong> in ${name}.</p>
      <p>Why not step outside?</p>
    `;
  }

  // --- Run the weather function on page load ---
  initWeather();
});
