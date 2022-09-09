//referencia al formulario

const form = document.getElementById('form'),
      textInput = document.getElementById('textInput'),
      dateInput = document.getElementById('dateInput'),
      msg = document.getElementById('msg'),
      textarea = document.getElementById('textarea'),
      add = document.getElementById('add');


// referencia al la tarea
const task = document.getElementById('task');

//validación del formulario

form.addEventListener('submit', (e) => {
    e.preventDefault();
    formValidation();
});

const formValidation = () => {
    if(textInput.value === '') {
        msg.innerHTML = 'Completa el título';
        setTimeout(() => {
            msg.innerHTML = '';
        }, 2000);
    }else {
        msg.innerHTML = '';
        acceptData();

        add.setAttribute("data-bs-dismiss", "modal");
        add.click();
        (() => {
        add.setAttribute("data-bs-dismiss", "");
      })();
    }   
};

let data = [];

let acceptData = () => {
    data.push({
        text: textInput.value,
        date: dateInput.value,
        description: textarea.value
    });

    localStorage.setItem('data', JSON.stringify(data));
    createTasks();
};

let createTasks = () => {
    task.innerHTML = "";
    data.map((newTask, y) => {
      return (task.innerHTML += `
      <div id=${y}>
            <span class="fw-bold">${newTask.text}</span>
            <span class="small text-secondary">${newTask.date}</span>
            <p>${newTask.description}</p>
    
            <span class="options">
              <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
              <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
            </span>
          </div>
      `);
    });
  
    resetForm();
  };

let resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
};

const deleteTask = (e) => {
    e.parentElement.parentElement.remove();

    data.splice(e.parentElement.parentElement.id, 1);

    localStorage.setItem('data', JSON.stringify(data));
};

const editTask = (e) => {
    let selectedTask = e.parentElement.parentElement;

    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;

    deleteTask(e);
};

(() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    createTasks();
})();
