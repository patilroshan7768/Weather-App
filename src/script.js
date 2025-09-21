const getWeatherBtn = document.querySelector("#getWeatherBtn");
const cityInput = document.querySelector("#cityInput");
const weatherResult = document.querySelector("#weatherResult");

getWeatherBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (!city) {
    alert("Please enter a city name!");
    return;
  }

  fetchWeather(city);
});

async function fetchWeather(city) {
  try {
    // Geocode city to get latitude and longitude
    const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);
    const geoData = await geoResponse.json();
    
    if (!geoData.results || geoData.results.length === 0) {
      throw new Error("City not found!");
    }

    const { latitude, longitude, name } = geoData.results[0];

    // Fetch current weather using latitude and longitude
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    const weatherData = await weatherResponse.json();

    displayWeather(weatherData, name);
  } catch (error) {
    weatherResult.innerHTML = `<p class="text-red-400 font-semibold">${error.message}</p>`;
  }
}

function displayWeather(data, cityName) {
  const current = data.current_weather;
  weatherResult.innerHTML = `
    <h2 class="text-2xl font-bold">${cityName}</h2>
    <p class="text-xl">🌡️ Temperature: ${current.temperature} °C</p>
    <p class="text-lg">🌥️ Weather Code: ${current.weathercode}</p>
    <p>💨 Wind Speed: ${current.windspeed} m/s</p>
  `;
}
