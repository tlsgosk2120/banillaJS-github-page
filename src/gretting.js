const form = document.querySelector(".js-grettings-form"),
  input = form.querySelector(".js-grettings-input"),
  greeting = document.querySelector(".js-grettings"),
  toDoGretting = document.querySelector(".js-toDo"),
  clockGretting = document.querySelector(".js-clock h1").innerText;

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  toDoGretting.classList.add(SHOWING_CN);
  const hour = parseInt(clockGretting.slice(0, clockGretting.leanth - 3));
  let time = "";
  if(hour > 0 && hour <= 12) {
    time = "Good morning";
  } else if(hour > 12 && hour < 17) {
    time = "Good afternoon";
  } else {
    time = "Good evening";
  };
  greeting.innerText = `${time}, ${text}`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();
