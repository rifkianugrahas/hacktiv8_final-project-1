const taskInput = document.getElementById("todo-new");
const addButton = document.getElementById("btn-simpan");
const taskList = document.getElementById("list-group");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

addButton.addEventListener("click", function (event) {
  event.preventDefault();
  addTask();
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskInput.value = "";
    renderTasks();
  }
}

function removeTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function toggleCompleted(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function renderTasks() {
  let todoHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    todoHTML += `
<li class="list-group-item d-flex justify-content-between">
  <div>
    <input class="form-check-input me-1" type="checkbox" ${task.completed ? "checked" : ""}>
    <span class="${task.completed ? "text-decoration-line-through" : ""}">${task.text}</span>
  </div>
  <button class="badge border-0 bg-danger btn-hapus" data-index="${i}">x</button>
</li>
`;
  }
  taskList.innerHTML = todoHTML;

  let checkTodo = document.querySelectorAll(".form-check-input");
  for (let index = 0; index < checkTodo.length; index++) {
    const input = checkTodo[index];
    input.addEventListener("change", function () {
      toggleCompleted(index);
    });
  }

  let btnHapus = document.querySelectorAll(".btn-hapus");
  for (let x = 0; x < btnHapus.length; x++) {
    const hapus = btnHapus[x];
    hapus.addEventListener("click", function () {
      const index = this.getAttribute("data-index");
      removeTask(index);
    });
  }
}

taskInput.focus();
