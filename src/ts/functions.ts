import { IAddResponse } from "./models/IAddResult";
import { Todo } from "./models/Todo";

export function addTodo(todoText: string, todos: Todo[]): IAddResponse {
  if (todoText.length > 2) {
    let newTodo = new Todo(todoText, false);
    todos.push(newTodo);
    return { success: true, error: "" };
  } else {
    return { success: false, error: "Du måste ange minst tre bokstäver" };
  }
}

export function changeTodo(todo: Todo) {
  todo.done = !todo.done;
}

export function removeAllTodos(todos: Todo[]) {
  todos.splice(0, todos.length);
}

export function sortAllTodos(todos: Todo[]) {

  todos.sort(function(a, b){
    let x: string = a.text.toLowerCase();
    let y: string = b.text.toLowerCase();
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  });

}