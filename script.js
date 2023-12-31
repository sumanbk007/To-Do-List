const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    const listItem = document.createElement("li");
    listItem.textContent = taskText;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.classList.add("delete-button");
    listItem.appendChild(deleteButton);

    taskList.appendChild(listItem);

    taskInput.value = "";

    saveTaskToLocalStorage();
  }
}

function saveTaskToLocalStorage() {
  const tasks = Array.from(taskList.getElementsByTagName("li")).map(
    (task) => task.textContent
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTaskFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((taskText) => {
    const listItem = document.createElement("li");

    listItem.textContent = taskText;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.classList.add("delete-button");
    listItem.appendChild(deleteButton);

    taskList.appendChild(listItem);
  });
}

function deleteTask(event) {
  if (event.target.classList.contains("delete-button")) {
    const removeTask = event.target.parentElement;

    removeTask.remove();

    saveTaskToLocalStorage();
  }
}

addTaskButton.addEventListener("click", addTask);
taskList.addEventListener("click", deleteTask);

window.addEventListener("load", loadTaskFromLocalStorage);
