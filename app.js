// 儲存待辦事項的 localStorage 鍵名
const STORAGE_KEY = "todo-items";

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const emptyMessage = document.querySelector("#empty-message");
const remainingCount = document.querySelector("#remaining-count");

// 從瀏覽器儲存空間讀取待辦事項
function loadTodos() {
  const savedTodos = localStorage.getItem(STORAGE_KEY);

  if (!savedTodos) {
    return [];
  }

  try {
    const todos = JSON.parse(savedTodos);
    return Array.isArray(todos) ? todos : [];
  } catch {
    return [];
  }
}

let todos = loadTodos();

// 將待辦事項寫入瀏覽器儲存空間
function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// 建立畫面中的待辦項目
function createTodoElement(todo) {
  const item = document.createElement("li");
  item.className = `todo-item${todo.completed ? " completed" : ""}`;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "todo-checkbox";
  checkbox.checked = todo.completed;
  checkbox.setAttribute("aria-label", `標示「${todo.text}」為已完成`);

  const text = document.createElement("span");
  text.className = "todo-text";
  text.textContent = todo.text;

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "delete-button";
  deleteButton.textContent = "刪除";
  deleteButton.setAttribute("aria-label", `刪除「${todo.text}」`);

  checkbox.addEventListener("change", () => {
    todo.completed = checkbox.checked;
    item.classList.toggle("completed", todo.completed);
    saveTodos();
    render();
  });

  deleteButton.addEventListener("click", () => {
    todos = todos.filter((currentTodo) => currentTodo.id !== todo.id);
    saveTodos();
    render();
  });

  item.append(checkbox, text, deleteButton);
  return item;
}

// 依目前資料重新繪製清單與未完成數量
function render() {
  todoList.replaceChildren();

  todos.forEach((todo) => {
    todoList.append(createTodoElement(todo));
  });

  emptyMessage.classList.toggle("hidden", todos.length > 0);

  const incompleteCount = todos.filter((todo) => !todo.completed).length;
  remainingCount.textContent = `未完成:${incompleteCount} 項`;
}

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = todoInput.value.trim();

  // 輸入空白時不建立待辦事項
  if (!text) {
    return;
  }

  todos.push({
    id: crypto.randomUUID(),
    text,
    completed: false
  });

  todoInput.value = "";
  saveTodos();
  render();
  todoInput.focus();
});

render();
