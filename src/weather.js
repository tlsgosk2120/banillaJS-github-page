const weather = document.querySelector(".js-weather");

const API_KEY = "1fd4e9155a1b171f225f179960a54680";
const COORDS = "coords";

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerText = `${temperature}°C 
      ${place}`;
    });
}

function saveCoords(coordsObg) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObg));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObg = {
    latitude,
    longitude
  };
  saveCoords(coordsObg);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("Cant access geo location");
}
function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCords = localStorage.getItem(COORDS);
  if (loadedCords === null) {
    askForCoords();
  } else {
    // getWeather
    const parseCoords = JSON.parse(loadedCords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
