// 儲存待辦事項的 localStorage 鍵名
const STORAGE_KEY = "todo-items";
const THEME_STORAGE_KEY = "todo-theme";

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const emptyMessage = document.querySelector("#empty-message");
const remainingCount = document.querySelector("#remaining-count");
const themeToggle = document.querySelector("#theme-toggle");
const filterButtons = document.querySelectorAll(".filter-button");
const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)");

let currentFilter = "all";

// 套用深淺色主題並同步切換按鈕文字
function applyTheme(theme) {
  const isDark = theme === "dark";
  document.documentElement.dataset.theme = theme;
  themeToggle.textContent = isDark ? "☀️ 淺色模式" : "🌙 深色模式";
  themeToggle.setAttribute("aria-label", isDark ? "切換為淺色模式" : "切換為深色模式");
}

// 沒有手動設定時跟隨作業系統主題
const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
applyTheme(savedTheme || (systemPrefersDark.matches ? "dark" : "light"));

themeToggle.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
  localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
});

// 只有尚未手動選擇主題時，持續跟隨作業系統變更
systemPrefersDark.addEventListener("change", (event) => {
  if (!localStorage.getItem(THEME_STORAGE_KEY)) {
    applyTheme(event.matches ? "dark" : "light");
  }
});

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

  const visibleTodos = todos.filter((todo) => {
    if (currentFilter === "active") {
      return !todo.completed;
    }

    if (currentFilter === "completed") {
      return todo.completed;
    }

    return true;
  });

  visibleTodos.forEach((todo) => {
    todoList.append(createTodoElement(todo));
  });

  if (todos.length === 0) {
    emptyMessage.textContent = "還沒有任何待辦事項,新增一個吧!";
  } else if (currentFilter === "active" && !todos.some((todo) => !todo.completed)) {
    emptyMessage.textContent = "目前沒有未完成的待辦事項。";
  } else if (currentFilter === "completed" && !todos.some((todo) => todo.completed)) {
    emptyMessage.textContent = "目前沒有已完成的待辦事項。";
  } else {
    emptyMessage.textContent = "";
  }

  emptyMessage.classList.toggle("hidden", visibleTodos.length > 0);

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

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;

    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });

    render();
  });
});

render();
