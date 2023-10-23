import { TASKS } from "../Assets/key.js";

import validateDescription from "../Helper/valDescription.js";
import validateName from "../Helper/valName.js";

const url = new URL(location);
const urlSearchParams = new URLSearchParams(url.search);

const [key, value] = [...urlSearchParams][0];

const tasks = JSON.parse(localStorage.getItem(TASKS));

const task = tasks.find(task => task[key] === value);

if (task === undefined) {
    document.body.innerHTML = '<div style="font-size: 150px;">444</div>';
}

const main = document.querySelector('main');
const form = document.createElement('form');
const div = document.createElement('div');

const p = document.createElement('p');
p.textContent = 'Edit Task';

const nameInput = document.createElement('input');
nameInput.value = task.name;
nameInput.maxLength = '25';
nameInput.placeholder = 'New Task Name';
nameInput.type = 'text';

const descriptionTextArea = document.createElement('textarea');
descriptionTextArea.value = task.description;
descriptionTextArea.placeholder = 'New Description';
descriptionTextArea.rows = 10;
descriptionTextArea.cols = 30;

const saveButton = document.createElement('button');
saveButton.className = 'form-save-task';
saveButton.textContent = 'Save Changes';

main.appendChild(form);
form.appendChild(div);
form.appendChild(p);
form.appendChild(nameInput);
form.appendChild(descriptionTextArea);
form.appendChild(saveButton);

const goBackButton = document.querySelector('.goback');

goBackButton.addEventListener('click', () => {
    window.history.back();
})

saveButton.addEventListener('click', e => {
    e.preventDefault();

    if (nameInput.value === task.name && descriptionTextArea.value === task.description) {
        alert('Nothing changed');
        return;
    }

    if (validateName(nameInput.value) && validateDescription(descriptionTextArea.value)) {
        if (nameInput.value === descriptionTextArea.value) {
            alert('Name and Description can not be same!');
            return;
        }

        const index = tasks.findIndex(t => t.id == task.id);
        tasks[index].name = nameInput.value;
        tasks[index].description = descriptionTextArea.value;
        localStorage.setItem(TASKS, JSON.stringify(tasks));
        window.history.back();
    }
})