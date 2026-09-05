const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const emptyState = document.getElementById("empty-state");
const remainingCount = document.getElementById("remaining-count");
const totalCount = document.getElementById("total-count");

const STORAGE_KEY = "todo-app-tasks";

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function createId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function render() {
  const tasks = loadTasks();
  list.innerHTML = "";

  tasks.forEach((task) => {
    const item = document.createElement("li");
    item.className = `todo-item${task.completed ? " completed" : ""}`;
    item.dataset.id = task.id;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", `标记「${task.text}」为已完成`);

    const text = document.createElement("span");
    text.className = "todo-text";
    text.textContent = task.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "delete-btn";
    deleteBtn.setAttribute("aria-label", `删除「${task.text}」`);
    deleteBtn.textContent = "×";

    item.append(checkbox, text, deleteBtn);
    list.appendChild(item);
  });

  const remaining = tasks.filter((task) => !task.completed).length;
  remainingCount.textContent = `${remaining} 项待完成`;
  totalCount.textContent = `共 ${tasks.length} 项`;
  emptyState.classList.toggle("visible", tasks.length === 0);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  const tasks = loadTasks();
  tasks.unshift({ id: createId(), text, completed: false });
  saveTasks(tasks);
  input.value = "";
  render();
  input.focus();
});

list.addEventListener("change", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement) || target.type !== "checkbox") return;

  const item = target.closest(".todo-item");
  if (!item) return;

  const tasks = loadTasks().map((task) =>
    task.id === item.dataset.id ? { ...task, completed: target.checked } : task
  );
  saveTasks(tasks);
  render();
});

list.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement) || !target.classList.contains("delete-btn")) return;

  const item = target.closest(".todo-item");
  if (!item) return;

  const tasks = loadTasks().filter((task) => task.id !== item.dataset.id);
  saveTasks(tasks);
  render();
});

render();
