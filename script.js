const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addTaskBtn");
const list = document.getElementById("taskList");

addBtn.addEventListener("click", function () {
  addTask();
});

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});
function addTask() {
  let text = input.value.trim();
  let error = document.getElementById("errorMessage");

  if (text === "") {
    error.style.display = "block";
    return;
  } else {
    error.style.display = "none";
  }

  let li = document.createElement("li");
  li.textContent = text;

  li.addEventListener("click", function () {
    li.classList.toggle("done");
  });

  // Delete button
  let btn = document.createElement("button");
  btn.textContent = "Delete";
  btn.addEventListener("click", function (e) {
    e.stopPropagation();
    li.remove();
    save();
  });

  li.appendChild(btn);
  list.appendChild(li);
  input.value = "";
  save();
}

function save() {
  let tasks = [];
  let items = list.querySelectorAll("li");
  items.forEach(function (item) {
    let onlyText = item.childNodes[0].textContent;
    tasks.push(onlyText);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function load() {
  let data = JSON.parse(localStorage.getItem("tasks"));
  if (!data) return;
  data.forEach(function (text) {
    input.value = text;
    addTask();
  });
}

load();


