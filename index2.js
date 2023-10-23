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
}

class TaskList {
    #tasks = [];

    constructor() {
        this.#tasks = JSON.parse(localStorage.getItem(TASKS)) || [];
    }

    get tasks() {
        return this.#tasks;
    }

    addTask(task) {
        this.#tasks.push(task);
    }

    deleteTask(task) {
        const index = tasks.findIndex(t => t.id === task.id);
        if (index !== -1) {
            tasks.splice(index, 1);
        }
        localStorage.setItem(TASKS, JSON.stringify(tasks));
        location.reload();
    }

    filterAll() {
        changeStatus();
        ul.innerHTML = '';

        tasks.forEach(task => {
            addTask(task);
        });
    }

    filterRemainded() {
        changeStatus();
        const arr = [];

        tasks.forEach(task => {
            if (task.isCompleted !== true) {
                arr.push(task);
            }
        })

        ul.innerHTML = '';

        if (sortByName.checked) {
            arr.sort((a, b) => {
                return a.name.localeCompare(b.name);
            });
        }
        if (sortByDate.checked) {
            arr.sort(function (a, b) {
                return parseDate(a.creationDate) - parseDate(b.creationDate);
            });
        }

        arr.forEach(task => {
            addTask(task);
        });
    }


    filterDone() {
        changeStatus();
        const arr = [];

        tasks.forEach(task => {
            if (task.isCompleted === true) {
                arr.push(task);
            }
        })

        ul.innerHTML = '';

        if (sortByName.checked) {
            arr.sort((a, b) => {
                return a.name.localeCompare(b.name);
            });
        }
        if (sortByDate.checked) {
            arr.sort(function (a, b) {
                return parseDate(a.creationDate) - parseDate(b.creationDate);
            });
        }

        arr.forEach(task => {
            addTask(task);
        });
    }

    sortByName() {
        const arr = [...tasks];

        arr.sort((a, b) => {
            return a.name.localeCompare(b.name);
        });

        ul.innerHTML = '';

        if (filterDone.checked) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].isCompleted === false) {
                    arr.splice(i, 1);
                }
            }
        }
        if (filterRemainded.checked) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].isCompleted === true) {
                    arr.splice(i, 1);
                }
            }
        }

        arr.forEach(task => {
            addTask(task);
        });
    }

    sortByDate() {
        const arr = [...tasks];

        arr.sort(function (a, b) {
            return parseDate(a.creationDate) - parseDate(b.creationDate);
        });

        ul.innerHTML = '';

        if (filterDone.checked) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].isCompleted === false) {
                    arr.splice(i, 1);
                }
            }
        }
        if (filterRemainded.checked) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].isCompleted === true) {
                    arr.splice(i, 1);
                }
            }
        }

        for (let i = arr.length - 1; i >= 0; i--) {
            addTask(arr[i]);
        }
    }
}

function parseDate(dateStr) {
    var parts = dateStr.split(" ");
    var dateParts = parts[0].split(".");
    var timeParts = parts[1].split(":");
    return new Date(dateParts[2], dateParts[1] - 1, dateParts[0], timeParts[0], timeParts[1], timeParts[2]);
}

const addTaskButton = document.querySelector('.add-task-button');
const main = document.querySelector('main');
const ul = document.createElement('ul');
main.appendChild(ul);
let task;

let tasks = JSON.parse(localStorage.getItem(TASKS)) || [];
let taskList = new TaskList();
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
        taskList.deleteTask(task);
    })

    li.appendChild(taskDiv);
    taskDiv.appendChild(link);
    link.appendChild(h2);
    taskDiv.appendChild(div);
    div.appendChild(input);
    editLink.appendChild(editButton);
    div.appendChild(editLink);
    editButton.appendChild(editIcon);
    div.appendChild(deleteButton);
    deleteButton.appendChild(deleteIcon);
    ul.appendChild(li);
}

function changeStatus() {
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
    changeStatus();
});

const filterDone = document.querySelector('.filter-done');
const filterRemainded = document.querySelector('.filter-remainded');
const filterAll = document.querySelector('.filter-all');

const sortByName = document.querySelector('.sort-by-name');
const sortByDate = document.querySelector('.sort-by-date');

filterDone.addEventListener('click', () => {
    taskList.filterDone();
})

filterRemainded.addEventListener('click', () => {
    taskList.filterRemainded();
})

filterAll.addEventListener('click', () => {
    taskList.filterAll();
})

sortByName.addEventListener('click', () => {
    taskList.sortByName();
})

sortByDate.addEventListener('click', () => {
    taskList.sortByDate();
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
    nameInput.maxLength = '33';
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

        if (validateName(nameInput.value) && validateDescription(descriptionTextArea.value)) {
            if (nameInput.value === descriptionTextArea.value) {
                alert('Name and Description can not be same!');
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
            taskList.addTask(taskObject);
            localStorage.setItem(TASKS, JSON.stringify(tasks));
            addTask(taskObject);
            form.style.display = 'none';
    
            changeStatus();
        }
    })
})

function validateDescription(description) {
    if (description.trim().length === 0) {
        alert('Minimum 1 word in Description!');
        return false;
    }

    return true;
}

function validateName(name) {
    name = name.replace(/\s+/g, ' ');

    const words = name.trim().split(/\s+/);
    if (words.length < 2) {
        alert('Minimum 2 words in Name!');
        return false;
    }

    let err = false;
    words.forEach(word => {
        if (word.length > 16) {
            alert('Words length cant be more than 16!');
            err = true;
        }
    })
    if (err) {
        return false;
    }

    const wordRegex = /^[a-zA-Zа-яА-Я0-9]+$/;
    words.forEach(word => {
        if (!wordRegex.test(word)) {
            alert('Only Dgigits, Russian/English letters')
            return false;
        }
    })

    const regex = /[a-zA-Zа-яА-Я]/;
    if (!regex.test(name)) {
        alert(`Can't be without letters!`)
        return false; 
    }

    return true;
}