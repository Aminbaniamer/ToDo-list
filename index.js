let addBtn = document.querySelector(".add-btn");
let list = document.querySelector(".list");
let input = document.querySelector(".input");

document.addEventListener("DOMContentLoaded", renderItems);
// ----------render Items

function renderItems() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    createTask(task.text, task.done);
  });
}
// ----------add task button handler

addBtn.addEventListener("click", () => {
  if (!input.value.trim()) {
    alert("لطفا فیلد خالی نفرست !");
    return;
  }
  createTask(input.value);

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: input.value, done: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  input.value = "";
});
// ---------- create task / build object of task

function createTask(taskText, isDone = false) {
  let listitem = document.createElement("li");
  listitem.className = "list-items";
  listitem.textContent = taskText;
  if (isDone) {
    listitem.classList.add("done");
  }
  list.appendChild(listitem);
  let btnContainer = document.createElement("div");
  btnContainer.className = "btn-container";
  listitem.appendChild(btnContainer);
  let doneBtn = document.createElement("button");
  doneBtn.className = "done-btn";
  doneBtn.textContent = "✅";
  btnContainer.appendChild(doneBtn);
  // ---------- done task button handler

  doneBtn.addEventListener("click", () => {
    listitem.classList.toggle("done");
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.map((item) => {
      if (item.text === taskText) {
        return { ...item, done: !item.done };
      }
      return item;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });
  let deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "🗑️";
  btnContainer.appendChild(deleteBtn);
  // ---------- delete button handler

  deleteBtn.addEventListener("click", () => {
    listitem.remove();
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter((item) => item.text !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });
}
