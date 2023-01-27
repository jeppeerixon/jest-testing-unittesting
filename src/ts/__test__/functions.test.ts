import { addTodo, changeTodo } from "../functions";
import { Todo } from "../models/Todo";

describe("Test for removeAllTodos", () => {

    test("Should remove allTodos", () => {
        // 1 arrange
        let listOfTodos: Todo[] = []; 
        let todoOne = addTodo("blabla", listOfTodos);
        let todoTwo = addTodo("wowowo", listOfTodos);
        
        // 2 act
        listOfTodos.splice(0, listOfTodos.length);

        // 3 assert
        expect(listOfTodos.length).toBe(0);

    });
});

describe("Tests for change Todo", () => {

    test("Should change done:false to TRUE", () => {
        // 1 arrange
        let dodo: Todo = {text: "something", done: false};
        
        // 2 act
        dodo.done = !dodo.done;
    
        // 3 assert
        expect(dodo.done).toBe(true);

    });

    test("Should change done:true to FALSE", () => {
        // 1 arrange
        let dodo: Todo = {text: "something", done: true};
        
        // 2 act
        dodo.done = !dodo.done;
    
        // 3 assert
        expect(dodo.done).toBe(false);

    });
});

describe("Tests for addTodo", () => {

    test("Should return success TRUE", () => {
        // 1 arrange
        let text = "hejsan"
        let listOfTodos: Todo[] = []; 
        //let todo1 = new Todo(text, false);
        //listOfTodos.push(todo1);

        // 2 act
        let result = addTodo(text, listOfTodos)
    
        // 3 assert
        expect(result.success).toBe(true);
        expect(listOfTodos.length).toBe(1);

    });

    test("Should return success FALSE", () => {
        // 1 arrange
        let letter = "F"
        let arrayOfTodos: Todo[] = []; 
        //let todo1 = new Todo(text, false);
        //listOfTodos.push(todo1);

        // 2 act
        let result = addTodo(letter, arrayOfTodos)
    
        // 3 assert
        expect(result.success).toBe(false);
        expect(arrayOfTodos.length).toBe(0);

    });
});