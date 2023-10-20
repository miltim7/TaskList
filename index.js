import { TASKS } from "./Assets/key.js";
class Task {
    #id;
    #name;
    #description;
    #creationDate;
    #isCompleted;

    constructor(name, description) {
        this.#id = Math.random().toString(16).slice(2);
        this.#isCompleted = false;
        this.#creationDate = this.#getCurrentDate();
        this.#name = name;
        this.#description = description;
    }

    #getCurrentDate() {
        const currentDate = new Date();
        const seconds = currentDate.getSeconds().toString().padStart(2, '0');
        const minutes = currentDate.getMinutes().toString().padStart(2, '0');
        const hours = currentDate.getHours().toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const year = currentDate.getFullYear().toString();

        return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
    }

    get id() {
        return this.#id;
    }

    get name() {
        return this.#name
    }

    get description() {
        return this.#description;
    }

    get creationDate() {
        return this.#creationDate;
    }

    get isCompleted() {
        return this.#isCompleted;
    }

    set isCompleted(value) {
        if (typeof value === 'boolean') {
            this.#isCompleted = value;
        }
    }

    delete() {

    }
}

class TaskList {
    #tasks;

    constructor(tasks) {
        this.#tasks = tasks;
    }

    addTask() {

    }

    filterByStatus() {

    }

    sortByName() {

    }

    sortByDate() {

    }
}

const addTaskButton = document.querySelector('.add-task-button');
const main = document.querySelector('main');
const ul = document.createElement('ul');
main.appendChild(ul);
let task;

let tasks = JSON.parse(localStorage.getItem(TASKS)) || [];
let taskList = new TaskList(tasks);
tasks.forEach(task => {
    addTask(task);
});

function addTask(task) {
    const li = document.createElement('li');
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task';
    const link = document.createElement('a');
    link.href = `/Details/details.html?id=${task.id}`;
    const h2 = document.createElement('h2');
    const div = document.createElement('div');
    const label = document.createElement('label');
    label.textContent = 'Status';
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.name = `status`;
    input.className = 'status';
    input.checked = task.isCompleted;
    const editLink = document.createElement('a');
    editLink.href = `/Edit/edit.html?id=${task.id}`;
    const editButton = document.createElement('button');
    editButton.className = 'edit';
    const editIcon = document.createElement('i');
    editIcon.className = 'bx bx-edit';
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete';
    const deleteIcon = document.createElement('i');
    deleteIcon.className = 'bx bx-basket';
    h2.textContent = task.name;

    deleteButton.addEventListener('click', () => {
        const index = tasks.findIndex(t => t.id === task.id);
        if (index !== -1) {
            tasks.splice(index, 1);
        }
        ul.removeChild(li);
        localStorage.setItem(TASKS, JSON.stringify(tasks));
    })
    
    li.appendChild(taskDiv);
    taskDiv.appendChild(link);
    link.appendChild(h2);
    taskDiv.appendChild(div);
    div.appendChild(label);
    div.appendChild(input);
    editLink.appendChild(editButton);
    div.appendChild(editLink);
    editButton.appendChild(editIcon);
    div.appendChild(deleteButton);
    deleteButton.appendChild(deleteIcon);
    ul.appendChild(li);
}

function changeStatus(ul, tasks) {
    ul.addEventListener('change', (e) => {
        if (e.target.classList.contains('status')) {
            const checkboxIndex = Array.from(ul.querySelectorAll('.status')).indexOf(e.target);
            if (checkboxIndex !== -1) {
                tasks[checkboxIndex].isCompleted = e.target.checked;
                localStorage.setItem(TASKS, JSON.stringify(tasks));
            }
        }
    });
}

window.addEventListener('load', () => {
    changeStatus(ul, tasks);
});

const filterByStatus = document.querySelector('.filter-by-status');
const sortByName = document.querySelector('.sort-by-name');
const sortByDate = document.querySelector('.sort-by-date');

sortByDate.addEventListener('click', () => {
    console.log('sort by date clicked');
    tasks.sort((a, b) => {
        const dateA = new Date(a.creationDate);
        const dateB = new Date(b.creationDate);
        
        if (dateA < dateB) {
            return -1;
        } else if (dateA > dateB) {
            return 1;
        } else {
            return 0;
        }
    });

    ul.innerHTML = '';

    for (let i = tasks.length - 1; i >= 0; i--) {
        addTask(tasks[i]);
    }

    localStorage.setItem(TASKS, JSON.stringify(tasks));
})

addTaskButton.addEventListener('click', e => {
    e.preventDefault();
    const form = document.createElement('form');
    form.name = 'modalForm';
    const div = document.createElement('div');
    div.className = 'form-close-div';

    const closeButton = document.createElement('button');

    const p = document.createElement('p');
    p.textContent = 'Creating Task';

    const nameInput = document.createElement('input');
    nameInput.maxLength = '25';
    nameInput.placeholder = 'Task Name';
    nameInput.type = 'text';

    const descriptionTextArea = document.createElement('textarea');
    descriptionTextArea.placeholder = 'Description';
    descriptionTextArea.rows = 10;
    descriptionTextArea.cols = 30;

    const saveButton = document.createElement('button');
    saveButton.className = 'form-save-task';
    saveButton.textContent = 'Save Changes';

    main.appendChild(form);
    form.appendChild(div);
    div.appendChild(closeButton);
    form.appendChild(p);
    form.appendChild(nameInput);
    form.appendChild(descriptionTextArea);
    form.appendChild(saveButton);

    
    closeButton.addEventListener('click', () => {
        form.style.display = 'none';
    })

    saveButton.addEventListener('click', e => {
        e.preventDefault();
        
        nameInput.value = nameInput.value.trim();
        if (nameInput.value === '') {
            alert('Enter Name!');
            return;
        }

        descriptionTextArea.value = descriptionTextArea.value.trim();
        if (descriptionTextArea.value === '') {
            alert('Enter Description!');
            return;
        }
        
        if (nameInput.value.length > 30) {
            alert('Too long name! < 25 characters!')
            return;
        }
        
        const namePattern = /^[A-Za-z0-9_]+$/;
        if (!namePattern.test(nameInput.value)) {
            alert('Enter Correct Name!');
            return;
        }

        task = new Task(nameInput.value, descriptionTextArea.value);
        
        
        const taskObject = {
            id: task.id,
            name: task.name,
            description: task.description,
            creationDate: task.creationDate,
            isCompleted: task.isCompleted
        }
        
        tasks.push(taskObject);
        localStorage.setItem(TASKS, JSON.stringify(tasks));
        addTask(taskObject);
        form.style.display = 'none';
        
        changeStatus(ul, tasks);
    })
})