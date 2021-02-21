const clockContainer = document.querySelector(".js-clock"),
  clockTitle = clockContainer.querySelector("h1");

function getTime() {
  const date = new Date();
  const minutese = date.getMinutes();
  const houres = date.getHours();
  clockTitle.innerText = `${houres < 10 ? `0${houres}` : houres}:${
    minutese < 10 ? `0${minutese}` : minutese
  }`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();
