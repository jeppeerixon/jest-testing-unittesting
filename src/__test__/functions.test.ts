import { addTodo, changeTodo, removeAllTodos, sortAllTodos } from "../ts/functions";
import { Todo } from "../ts/models/Todo";

describe("Test for removeAllTodos", () => {

    test("Should remove allTodos", () => {
        // 1 arrange
        let listOfTodos: Todo[] = []; 
        let todoOne = addTodo("blabla", listOfTodos);
        let todoTwo = addTodo("wowowo", listOfTodos);
        
        // 2 act
        removeAllTodos(listOfTodos);

        // 3 assert
        expect(listOfTodos.length).toBe(0);

    });
});

describe("Tests for change Todo", () => {

    test("Should change done:false to TRUE", () => {
        // 1 arrange
        let dodo: Todo = {text: "something", done: false};
        
        // 2 act
        changeTodo(dodo);
    
        // 3 assert
        expect(dodo.done).toBeTruthy();

    });

    test("Should change done:true to FALSE", () => {
        // 1 arrange
        let dodo: Todo = {text: "something else", done: true};
        
        // 2 act
        changeTodo(dodo);
    
        // 3 assert
        expect(dodo.done).toBeFalsy();

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


describe("Tests for sort function", () => {

    test("Should return list in abc-order", () => {
        // 1 arrange
        let listOfTodos: Todo[] = []; 
        let todoOne = addTodo("cccc", listOfTodos);
        let todoTwo = addTodo("aaaa", listOfTodos);
        let todoThree = addTodo("dddd", listOfTodos);
        let todoFour = addTodo("BBBB", listOfTodos);

        // 2 act
        let sortedList = sortAllTodos(listOfTodos);

        // 3 assert
        expect(listOfTodos[0].text).toBe("aaaa");
        expect(listOfTodos[3].text).toBe("dddd");


    });

    test("Should return list in abc-order", () => {
        // 1 arrange
        let listOfTodos: Todo[] = []; 
        let todoOne = addTodo("CCCC", listOfTodos);
        let todoTwo = addTodo("AAAA", listOfTodos);
        let todoThree = addTodo("dddd", listOfTodos);
        let todoFour = addTodo("bbbb", listOfTodos);
        let todoFive = addTodo("cccc", listOfTodos);

        // 2 act
        let sortedList = sortAllTodos(listOfTodos);

        // 3 assert
        expect(listOfTodos[2].text).toBe("CCCC");
        expect(listOfTodos[3].text).toBe("cccc");


    });

});