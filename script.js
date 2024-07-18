const apikey = "0aadb4047b1b7f0973ce62a933403b20";

const weatherDataEl = document.getElementById("weather-data")

const cityInputEl = document.getElementById("city-input")

const formEl = document.querySelector("form");

//proximamente...




formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityValue = cityInputEl.value;
  getWeatherData(cityValue);
});

// recomendar ropa
function giveFashionAdvice(temperature, description) {
  if (temperature > 25) {
    return "Hace mucho calor, te recomendaría usar ropa ligera como camisetas, shorts y sandalias.";
  } else if (temperature > 15) {
    return "La temperatura es agradable, puedes optar por llevar una chaqueta ligera y pantalones.";
  } else {
    return "Hace frío, es mejor abrigarse con suéteres, abrigos y bufandas.";
  }
}

async function getWeatherData(cityValue) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`)

    if (!response.ok) {
      throw new Error("Network reponse was not ok")
    }

    const data = await response.json()

    const temperature = Math.round(data.main.temp)

    const description = data.weather[0].description

    const icon = data.weather[0].icon

    // ropa
    const fashionAdvice = giveFashionAdvice(temperature, description);

    const details = [
      `Feels like: ${Math.round(data.main.feels_like)}`,
      `Humedad: ${data.main.humidity}%`,
      `Viento: ${data.wind.speed} m/h`
    ]

    weatherDataEl.querySelector(".icon").innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="icono del clima" />`;
    weatherDataEl.querySelector(
      ".temperature"
    ).textContent = `${temperature}°C`;

    weatherDataEl.querySelector(
      ".description"
    ).textContent = description;

    weatherDataEl.querySelector(".details").innerHTML = details.map((detail) => `<div>${detail}</div>`).join('');

    // Mostrar la recomendación de moda en una alerta
    alert(fashionAdvice);

  } catch (error) {
    weatherDataEl.querySelector(".icon").innerHTML = "";
    weatherDataEl.querySelector(".temperature").textContent = "";
    weatherDataEl.querySelector(".description").textContent = "Error al obtener los datos del clima";

    weatherDataEl.querySelector(".details").innerHTML = "";
  }
}