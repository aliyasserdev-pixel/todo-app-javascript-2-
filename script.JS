// ======================
// SELECT ELEMENTS
// ======================

const todoInput = document.querySelector(".todo__create input");

const todoContent = document.querySelector(".todo__content");

const itemsLeft = document.querySelector(".todo__footer span");

const clearBtn = document.querySelector(".clear-btn");

const filterButtons = document.querySelectorAll(".todo__filter button");

// ======================
// DARK MODE
// ======================

const themeBtn = document.querySelector(".theme-btn");

const themeIcon = themeBtn.querySelector("img");

let darkMode = false;

themeBtn.addEventListener("click", function () {
  darkMode = !darkMode;

  if (darkMode) {
    // BODY
    document.body.style.backgroundColor = "hsl(235, 21%, 11%)";

    document.body.style.backgroundImage = 'url("../images/bg-desktop-dark.jpg")';

    // CARDS
    document.documentElement.style.setProperty(
      "--card-bg",
      "hsl(235, 24%, 19%)",
    );

    // TEXT
    document.documentElement.style.setProperty(
      "--text-main",
      "hsl(234, 39%, 85%)",
    );

    document.documentElement.style.setProperty(
      "--text-light",
      "hsl(234, 11%, 52%)",
    );

    document.documentElement.style.setProperty(
      "--border",
      "hsl(237, 14%, 26%)",
    );

    // ICON
    themeIcon.src = "./images/icon-sun.svg";
  } else {
    // BODY
    document.body.style.backgroundColor = "hsl(0, 0%, 98%)";

    document.body.style.backgroundImage =
      'url("./images/bg-desktop-light.jpg")';

    // COLORS
    document.documentElement.style.setProperty("--card-bg", "#ffffff");

    document.documentElement.style.setProperty(
      "--text-main",
      "hsl(235, 19%, 35%)",
    );

    document.documentElement.style.setProperty(
      "--text-light",
      "hsl(236, 9%, 61%)",
    );

    document.documentElement.style.setProperty(
      "--border",
      "hsl(233, 11%, 84%)",
    );

    // ICON
    themeIcon.src = "./images/icon-moon.svg";
  }
});

// ======================
// CREATE TODO
// ======================

todoInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const text = todoInput.value.trim();

    if (text === "") return;

    createTodo(text);

    todoInput.value = "";

    updateItems();
  }
});

// ======================
// CREATE TODO FUNCTION
// ======================

function createTodo(text) {
  const todoItem = document.createElement("div");

  todoItem.classList.add("todo__item");

  todoItem.innerHTML = `

    <div class="left">

      <span class="circle"></span>

      <p>${text}</p>

    </div>

    <button class="delete-btn">

      <img
        src="./images/icon-cross.svg"
        alt="delete"
      />

    </button>

  `;

  const footer = document.querySelector(".todo__footer");

  todoContent.insertBefore(todoItem, footer);

  addEvents(todoItem);
}

// ======================
// ADD EVENTS
// ======================

function addEvents(todoItem) {
  const circle = todoItem.querySelector(".circle");

  const deleteBtn = todoItem.querySelector(".delete-btn");

  // COMPLETE
  circle.addEventListener("click", function () {
    completeTodo(todoItem, circle);
  });

  // DELETE
  deleteBtn.addEventListener("click", function () {
    todoItem.remove();

    updateItems();
  });
}

// ======================
// COMPLETE TODO
// ======================

function completeTodo(todoItem, circle) {
  // تبديل completed
  todoItem.classList.toggle("completed");

  // إذا مكتمل
  if (todoItem.classList.contains("completed")) {
    circle.className = "check-btn";

    circle.innerHTML = `

      <img
        src="./images/icon-check.svg"
        alt="check"
      />

    `;
  }

  // إذا غير مكتمل
  else {
    circle.className = "circle";

    circle.innerHTML = "";
  }

  updateItems();
}

// ======================
// DEFAULT TODOS
// ======================

const todos = document.querySelectorAll(".todo__item");

todos.forEach((todo) => {
  const circle = todo.querySelector(".circle, .check-btn");

  const deleteBtn = todo.querySelector(".delete-btn");

  // COMPLETE
  circle.addEventListener("click", function () {
    completeTodo(todo, circle);
  });

  // DELETE
  deleteBtn.addEventListener("click", function () {
    todo.remove();

    updateItems();
  });
});

// ======================
// UPDATE ITEMS
// ======================

function updateItems() {
  const allTodos = document.querySelectorAll(".todo__item");

  const completedTodos = document.querySelectorAll(".completed");

  const left = allTodos.length - completedTodos.length;

  itemsLeft.textContent = `${left} items left`;
}

updateItems();

// ======================
// FILTER TODOS
// ======================

// ======================
// FILTER TODOS
// ======================

filterButtons.forEach((button) => {

  button.addEventListener(
    "click",
    function () {

      // active button
      filterButtons.forEach((btn) => {

        btn.classList.remove("active");
      });

      button.classList.add("active");

      const todos =
        document.querySelectorAll(".todo__item");

      todos.forEach((todo) => {

        // ALL
        if (
          button.textContent.trim() === "All"
        ) {

          todo.style.display = "flex";
        }

        // ACTIVE
        else if (
          button.textContent.trim() === "Active"
        ) {

          if (
            todo.classList.contains("completed")
          ) {

            todo.style.display = "none";
          }

          else {

            todo.style.display = "flex";
          }
        }

        // COMPLETED
        else if (
          button.textContent.trim() === "Completed"
        ) {

          if (
            todo.classList.contains("completed")
          ) {

            todo.style.display = "flex";
          }

          else {

            todo.style.display = "none";
          }
        }
      });
    }
  );
});

// ======================
// CLEAR COMPLETED
// ======================

clearBtn.addEventListener("click", function () {
  const completedTodos = document.querySelectorAll(".completed");

  completedTodos.forEach((todo) => {
    todo.remove();
  });

  updateItems();
});
