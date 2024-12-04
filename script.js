const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const iconElement = document.getElementById('weather-icon');

const API_KEY = '8a5ea1ee107c7c099cde3ada3c764684';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const city = input.value.trim();
  if (city) {
    getWeather(city);
    input.value = '';
  }
});

async function getWeather(city) {
  try {
    const response = await fetch(`${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`);
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    console.log('Error:', error);
  }
}

function displayWeather(data) {
  if (data.cod === '404') {
    locationElement.textContent = 'City not found';
    temperatureElement.textContent = '';
    descriptionElement.textContent = '';
    iconElement.innerHTML = '';
  } else {
    locationElement.textContent = `${data.name}, ${data.sys.country}`;
    temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
    descriptionElement.textContent = data.weather[0].description;
    iconElement.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather Icon" />`;

    // Change background based on weather
    const weather = data.weather[0].main.toLowerCase();
    switch (weather) {
      case 'clear':
        document.body.style.background = "url('https://plus.unsplash.com/premium_photo-1680466283263-91b51ab91832?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2xlYXIlMjBza3l8ZW58MHx8MHx8fDA%3D') no-repeat center center fixed";
        document.body.style.backgroundSize = "cover"; // Clear sky
        break;
      case 'clouds':
        document.body.style.background = "url('https://images.unsplash.com/photo-1624646959989-ecc0b3f446d6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2xvdWR5JTIwd2VhdGhlcnxlbnwwfHwwfHx8MA%3D%3D') no-repeat center center fixed";
        document.body.style.backgroundSize = "cover"; // Cloudy
        break;
      case 'rain':
        document.body.style.background = "url('https://images.unsplash.com/photo-1708497371179-7d58c546d6cc?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') no-repeat center center fixed";
        document.body.style.backgroundSize = "cover"; // Rainy
        break;
      case 'snow':
        document.body.style.background = "url('https://images.unsplash.com/photo-1457270508644-1e4905fabd7e?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') no-repeat center center fixed";
        document.body.style.backgroundSize = "center"; // Snowy
        break;
      case 'thunderstorm':
        document.body.style.background = "url('https://images.unsplash.com/photo-1457528877294-b48235bdaa68?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') no-repeat center center fixed";
        document.body.style.backgroundSize = "cover"; // Thunderstorm
        break;
      case 'haze':
        document.body.style.background = "url('https://plus.unsplash.com/premium_photo-1674475564066-f063d788abbe?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGF6eSUyMHNreXxlbnwwfHwwfHx8MA%3D%3D') no-repeat center center fixed";
        document.body.style.backgroundSize = "cover"; // Haze
        break;
      default:
        document.body.style.background = "url('https://images.unsplash.com/photo-1561553873-e8491a564fd0?q=80&w=3094&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') no-repeat center center fixed";
        document.body.style.backgroundSize = "cover"; // Default
        break;
    }
  }
}
