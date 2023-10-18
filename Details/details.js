import { TASKS } from "../Assets/key.js";
  
const url = new URL(location);
const urlSearchParams = new URLSearchParams(url.search);

const [key, value] = [...urlSearchParams][0];

const tasks = JSON.parse(localStorage.getItem(TASKS));

const task = tasks.find(task => task[key] === value);

console.log(task);

const goBackButton = document.querySelector('button');
goBackButton.addEventListener('click', function() {
    window.history.back();
})

const main = document.querySelector('main');
const div = document.createElement('div');

const id = document.createElement('p');
id.textContent = task.id;

const completed = document.createElement('p');
completed.textContent = task.isCompleted.toString();

const creationDate = document.createElement('p');
creationDate.textContent = task.creationDate;

const name = document.createElement('p');
name.textContent = task.name;

const description = document.createElement('p');
description.textContent = task.description;

main.appendChild(div);

div.appendChild(id);
div.appendChild(completed);
div.appendChild(creationDate);
div.appendChild(name);
div.appendChild(description);