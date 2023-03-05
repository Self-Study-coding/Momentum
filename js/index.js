// -------- clock start --------
const clockTitle = document.querySelector("div .clock");

function presentClock () {
    const time = new Date();
    const hours = String(time.getHours()).padStart(2,"0");
    const minutes = String(time.getMinutes()).padStart(2,"0");
    const seconds = String(time.getSeconds()).padStart(2,"0");
    clockTitle.innerHTML = `${hours} : ${minutes} : ${seconds}`;
}

presentClock();
setInterval(presentClock, 1000);

// -------- clock end --------

// -------- random background start --------

const images = [
    "01.jpg",
    "02.jpg",
    "03.jpg",
    "04.jpg",
    "05.jpg",
    "06.jpg",
    "07.png",
    "08.png",
    "09.png",
    "10.png",
];

const choosenImage = images[Math.floor(Math.random() * images.length)];

const bgImg = `url(./img/${choosenImage})`;

bgImg.backgroundImage = choosenImage;

document.body.style.backgroundImage = bgImg;

// -------- random background end--------

// -------- login for localstorage start--------

const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";


function onLoginSubmit (event) {
    event.preventDefault();
    const username = loginInput.value;
    localStorage.setItem(USERNAME_KEY, username);
    loginForm.classList.add(HIDDEN_CLASSNAME);
    paintGreetings(username);
}

function paintGreetings (username) {
    greeting.innerText = `Hello! ${username}`;
    greeting.classList.remove(HIDDEN_CLASSNAME);
}

loginForm.addEventListener("submit", onLoginSubmit);


const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) {
    // show the form
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit", onLoginSubmit);
} else {
    paintGreetings(savedUsername);
    // show the greeting
}

// -------- login for localstorage end --------

// -------- Todo start --------

const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos () {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}


function removeToDo (event) {
    const doing = event.target.parentElement;
    toDos = toDos.filter((toDo) => toDo.id !== doing.id);
    doing.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(doing.id));
    saveToDos();
}

function paintToDo(newTodo){
    const doing = document.createElement("li");
    doing.id = newTodo.id;
    const span = document.createElement("span");
    span.innerText = newTodo.text;

    const clickBtn = document.createElement("button");
    clickBtn.innerText = " X";
    clickBtn.addEventListener("click", removeToDo);

    doing.appendChild(span);
    doing.appendChild(clickBtn);
    toDoList.appendChild(doing);

}

function handleToDoSubmit (event) {
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = ""; 
    const newTodoOBJ = {
        text:newTodo,
        id : Date.now(),
    };

    toDos.push(newTodoOBJ);
    paintToDo(newTodoOBJ);
    saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if(savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
}

// -------- Todo end --------

// -------- weather start --------

const API_KEY = "2fe39194380547a275e28bdfd5465c4f";
const city = document.querySelector("#weather span:first-child");
const weather = document.querySelector("#weather span:last-child");



function onGeoOk(position){
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
    city.innerText = data.name;
    weather.innerText = `Weather is ${data.weather[0].main} / Current degree : ${data.main.temp}`;
    });
}

function onGeoError(){
    alert("Can't find you, weather fot you.")
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

// -------- weather end --------
