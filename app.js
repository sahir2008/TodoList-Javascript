// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// Functions
function addTodo(e) {
  // Prevent form from submitting
  e.preventDefault();

  // Todo Div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // Create The List item  li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");

  // Insert the li into the Div
  todoDiv.appendChild(newTodo);

  //   Add Todo To LocalStorage
  saveLocalTodos(todoInput.value);

  //   Check Mark Button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");

  //   Insert the Complete button into the Div
  todoDiv.appendChild(completedButton);

  //   Check Trash Button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");

  //   Insert the Trash button into the Div
  todoDiv.appendChild(trashButton);

  // Insert The Div we created with all the content (li , complete-btn, trash-btn) into the List (ul)
  todoList.appendChild(todoDiv);

  //   Clear Todo Input Value
  todoInput.value = "";
}

function deleteCheck(e) {
  // Delete Todo
  const item = e.target;
  const todo = item.parentElement;
  if (item.classList[0] === "trash-btn") {
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  //   Compelte Todo
  if (item.classList[0] === "complete-btn") {
    todo.classList.toggle("completed");
  }
}
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
    }
  });
}

function saveLocalTodos(todo) {
  let todos;
  // Check --- Do we have somthing in localStorage ?
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  // Check --- Do we have somthing in localStorage ?
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    // Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Create The List item  li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");

    // Insert the li into the Div
    todoDiv.appendChild(newTodo);

    //   Check Mark (Complete) Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");

    //   Insert the Complete button into the Div
    todoDiv.appendChild(completedButton);

    //   Check Trash Button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");

    //   Insert the Trash button into the Div
    todoDiv.appendChild(trashButton);

    // Insert The Div we created with all the content (li , complete-btn, trash-btn) into the List (ul)
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  // Check --- Do we have somthing in localStorage ?
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.childNodes[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

const modeBtn = document.querySelector("#btn");

modeBtn.addEventListener("click", function () {
  const bg = document.body;
  bg.classList.toggle("darkMode");
});
