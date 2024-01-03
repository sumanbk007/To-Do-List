const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTask");
const saveChangeButton = document.getElementById("saveChange");
const taskList = document.getElementById("taskList");

function createDeleteButton() {
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-button");
  return deleteButton;
}

function createEditButton() {
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.classList.add("edit-button");
  return editButton;
}

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    const listItem = document.createElement("li");
    listItem.textContent = taskText;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");
    listItem.appendChild(deleteButton);

    const editButton = createEditButton();
    console.log(editButton);
    listItem.appendChild(editButton);

    taskList.appendChild(listItem);

    taskInput.value = "";

    saveTaskToLocalStorage();
  }
}

function saveTaskToLocalStorage() {
  const tasks = Array.from(taskList.getElementsByTagName("li")).map(
    (task, index) => task.childNodes[0].textContent.trim()
  );

  // console.log(tasks);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTaskFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((taskText) => {
    const listItem = document.createElement("li");

    listItem.textContent = taskText;

    const deleteButton = createDeleteButton();

    listItem.appendChild(deleteButton);
    const editButton = createEditButton();
    listItem.appendChild(editButton);

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

//Edit functionality

function editTask(event) {
  if (event.target.classList.contains("edit-button")) {
    const listItem = event.target.parentElement;

    taskInput.value = listItem.childNodes[0].textContent.trim();

    saveChangeButton.addEventListener("click", () => {
      const taskText = taskInput.value.trim();
      console.log(taskText);
      listItem.textContent = taskText;
      const deleteButton = createDeleteButton();
      listItem.appendChild(deleteButton);
      const editButton = createEditButton();
      listItem.appendChild(editButton);
      saveTaskToLocalStorage();

      taskInput.value = "";
    });
  }
}

addTaskButton.addEventListener("click", addTask);
taskList.addEventListener("click", deleteTask);
taskList.addEventListener("click", editTask);

window.addEventListener("load", loadTaskFromLocalStorage);
