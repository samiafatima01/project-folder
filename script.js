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
  const text = input.value.trim();
  const error = document.getElementById("errorMessage");

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

const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", function () {
    localStorage.clear();
    window.location.href = "login.html";
  });
}

function changePassword() {
  const username = document.getElementById("changeUsername").value.trim();
  const oldPass = document.getElementById("oldPassword").value;
  const newPass = document.getElementById("newPassword").value;
  const msg = document.getElementById("changePassMsg");

  if (!username || !oldPass || !newPass) {
    msg.textContent = "All fields are required.";
    return;
  }

  const user = JSON.parse(localStorage.getItem(username));

  if (!user || user.password !== oldPass) {
    msg.textContent = "Incorrect username or old password.";
    return;
  }

  user.password = newPass;
  localStorage.setItem(username, JSON.stringify(user));
  msg.style.color = "green";
  msg.textContent = "Password changed successfully!";
}
