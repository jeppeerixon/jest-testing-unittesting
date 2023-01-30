import { addTodo, changeTodo, removeAllTodos, sortAllTodos } from "./functions";
import { Todo } from "./models/Todo";

let todos: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");

document.getElementById("clearTodos")?.addEventListener("click", () => {
  clearTodos(todos);
});

document.getElementById("sortBtn")?.addEventListener("click", () => {
  sortTodos(todos);
});

(document.getElementById("newTodoForm") as HTMLFormElement)?.addEventListener(
  "submit",
  (e: SubmitEvent) => {
    e.preventDefault();

    let todoText: string = (
      document.getElementById("newTodoText") as HTMLInputElement
    ).value;
    console.log("Todos when creating", todos);

    createNewTodo(todoText, todos);
  }
);

export function createNewTodo(todoText: string, todos: Todo[]) {
  let result = addTodo(todoText, todos);

  if (result.success) {
    exports.createHtml(todos);
    // exports.displayError(result.error, false); gör så error meddelandet försvinner
  } else {
    exports.displayError(result.error, true);
  }
}

export function createHtml(todos: Todo[]) {
  localStorage.setItem("todos", JSON.stringify(todos));

  let todosContainer: HTMLUListElement = document.getElementById("todos") as HTMLUListElement;
  
  // if (todosContainer) {
  //    todosContainer.innerHTML = "";
  // } 

  todosContainer.innerHTML = "";

  for (let i = 0; i < todos.length; i++) {
    let li: HTMLLIElement = document.createElement("li");

    if (todos[i].done) {
      li.classList.add("todo__text--done");
    }

    li.classList.add("todo__text");
    li.innerHTML = todos[i].text;
    li.addEventListener("click", () => {
      toggleTodo(todos[i]);
      console.log(todos[i]);
    });

    todosContainer.appendChild(li);
  }
}

export function toggleTodo(todo: Todo) {
  changeTodo(todo)
  exports.createHtml(todos); 
}

export function displayError(error: string, show: boolean) {
  let errorContainer: HTMLDivElement = document.getElementById(
    "error"
  ) as HTMLDivElement;

  errorContainer.innerHTML = error;

  if (show) {
    errorContainer.classList.add("show");
  } else {
    errorContainer.classList.remove("show");
  }
}

export function clearTodos(todos: Todo[]) {
  removeAllTodos(todos);
  exports.createHtml(todos);
}

export function sortTodos(todos: Todo[]) {
  sortAllTodos(todos);
  exports.createHtml(todos);
}

// kommentera bort eller använda if funktionen
//createHtml(todos); 