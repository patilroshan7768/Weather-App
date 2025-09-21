const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key
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
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) throw new Error("City not found!");

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    weatherResult.innerHTML = `<p class="text-red-400 font-semibold">${error.message}</p>`;
  }
}

function displayWeather(data) {
  weatherResult.innerHTML = `
    <h2 class="text-2xl font-bold">${data.name}, ${data.sys.country}</h2>
    <p class="text-xl">🌡️ Temperature: ${data.main.temp} °C</p>
    <p class="text-lg">🌥️ Weather: ${data.weather[0].main} - ${data.weather[0].description}</p>
    <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
    <p>💧 Humidity: ${data.main.humidity}%</p>
  `;
}
