document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "0137328857e384bec545718d4749db31";
  const weatherWidget = document.getElementById("weather-widget");

  function initWeather() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successPrecise, geoError);
    } else {
      weatherWidget.textContent = "Geolocation not supported. Fetching default weather.";
      fetchWeatherByCity("Boulder");
    }
  }

  function successPrecise(position) {
    const { latitude, longitude } = position.coords;
    fetchWeatherByCoords(latitude, longitude);
  }

  function geoError() {
    weatherWidget.textContent = "Could not get your location. Fetching weather for Boulder.";
    fetchWeatherByCity("Boulder");
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

  function displayWeather(data) {
    const { name, main, weather } = data;
    const temp = Math.round(main.temp);
    const description = weather[0].description;

    weatherWidget.innerHTML = `
      <h3>Time for a break?</h3>
      <p>It's currently <strong>${temp}°C</strong> and <strong>${description}</strong> in ${name}.</p>
      <p>step outside and touch grass!</p>
    `;
  }

  initWeather();
});
