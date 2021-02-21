const toDo = document.querySelector(".js-toDo"),
  toDoForm = toDo.querySelector(".js-toDo-form"),
  toDoInput = toDoForm.querySelector(".js-toDo-input"),
  pendingList = toDo.querySelector(".js-pending"),
  finishedList = toDo.querySelector(".js-finished");

const PENDING_LS = "PENDING",
  FINISHED_LS = "FINISHED";

let pendings = [],
  finisheds = [];

function moveToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const span = btn.nextSibling.innerText;
  let toDoTemps = [];
  let stringToDos = "";
  if (btn.checked) {
    console.log("checked");
    toDoTemps = pendings;
    stringToDos = PENDING_LS;
    pendingList.removeChild(li);
  } else {
    console.log("unchecked");
    toDoTemps = finisheds;
    stringToDos = FINISHED_LS;
    finishedList.removeChild(li);
  }
  const cleanToDos = toDoTemps.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDoTemps = cleanToDos;
  saveToDos(stringToDos, toDoTemps);
  if (stringToDos === PENDING_LS) {
    pendings = cleanToDos;
    paintToDo(FINISHED_LS, span, null);
  } else {
    finisheds = cleanToDos;
    paintToDo(PENDING_LS, span, null);
  }
}

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const ul = li.parentNode.className.split("-");
  let toDoTemps = [];
  let stringToDos = ul[1].toUpperCase();
  if (stringToDos === PENDING_LS) {
    toDoTemps = pendings;
    pendingList.removeChild(li);
  } else {
    toDoTemps = finisheds;
    stringToDos = FINISHED_LS;
    finishedList.removeChild(li);
  }
  const cleanToDos = toDoTemps.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDoTemps = cleanToDos;
  saveToDos(stringToDos, toDoTemps);
  if (stringToDos === PENDING_LS) {
    pendings = cleanToDos;
  } else {
    finisheds = cleanToDos;
  }
}

function saveToDos(listString, toDos) {
  localStorage.setItem(listString, JSON.stringify(toDos));
}

function paintToDo(listString, text, id) {
  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  let toDoTemps = [];
  let toDoListTemps = [];
  li.setAttribute("class", "penning-ls");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("class", "btn-chk");
  if (listString === PENDING_LS) {
    toDoTemps = pendings;
    toDoListTemps = pendingList;
  } else {
    span.style.textDecoration = "line-through";
    checkbox.setAttribute("checked", true);
    toDoTemps = finisheds;
    toDoListTemps = finishedList;
  }
  delBtn.setAttribute("class", "btn-del");
  delBtn.innerText = "X";
  delBtn.addEventListener("click", deleteToDo);
  checkbox.addEventListener("change", moveToDo);
  span.innerText = text;
  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(delBtn);
  const newId = id === null ? toDoTemps.length + 1 : id;
  li.id = newId;
  toDoListTemps.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDoTemps.push(toDoObj);
  saveToDos(listString, toDoTemps);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(PENDING_LS, currentValue, null);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedPendings = localStorage.getItem(PENDING_LS);
  const loadedFinisheds = localStorage.getItem(FINISHED_LS);
  if (loadedPendings !== null) {
    const parsedPendings = JSON.parse(loadedPendings);
    parsedPendings.forEach(function (toDo) {
      console.log(toDo.text, " : ", toDo.id);
      paintToDo(PENDING_LS, toDo.text, toDo.id);
    });
  }
  if (loadedFinisheds !== null) {
    const parsedFinished = JSON.parse(loadedFinisheds);
    parsedFinished.forEach(function (toDo) {
      console.log(toDo.text, " : ", toDo.id);
      paintToDo(FINISHED_LS, toDo.text, toDo.id);
    });
  }
}

function init() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser !== null) {
    toDo.classList.add(SHOWING_CN);
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
  }
}

init();
