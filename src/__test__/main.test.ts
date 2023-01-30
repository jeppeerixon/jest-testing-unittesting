/**
 * @jest-environment jsdom
*/
import { displayError, toggleTodo, createHtml } from "../ts/main";
import { addTodo, changeTodo, removeAllTodos } from "../ts/functions";
import { Todo } from "../ts/models/Todo";
import * as main from "../ts/main";
import * as functions from "../ts/functions";

describe("Tests for displayError function", () => {

    test("Should NOT show error message", () => {
        // 1 arrange
        document.body.innerHTML = `
        <form id="newTodoForm">
        <div>
            <input type="text" id="newTodoText" />
            <button>Skapa</button>
            <button type="button" id="clearTodos">Rensa lista</button>
        </div>
        <div id="error" class="error"></div>
        </form>
        <ul id="todos" class="todo"></ul>
        `;

        let errorDiv: HTMLDivElement = document.querySelector("#error") as HTMLDivElement;
        let textToSend: string = "";

        // 2 act
        displayError(textToSend, false);

        // 3 assert
        expect(errorDiv.classList.contains('show')).toBe(false);
        expect(errorDiv.innerHTML).toBe("");

    });
    
    test("Should display error message", () => {
        // 1 arrange
        document.body.innerHTML = `
        <form id="newTodoForm">
        <div>
            <input type="text" id="newTodoText" />
            <button>Skapa</button>
            <button type="button" id="clearTodos">Rensa lista</button>
        </div>
        <div id="error" class="error"></div>
        </form>
        <ul id="todos" class="todo"></ul>
        `;

        let errorDiv: HTMLDivElement = document.querySelector("#error") as HTMLDivElement;
        let textToSend: string = "error message";

        // 2 act
        displayError(textToSend, true);
        //let errorText = errorDiv.innerHTML

        // 3 assert
        expect(errorDiv.classList.contains('show')).toBe(true);
        expect(errorDiv.innerHTML).toBe("error message");
    });

});

describe("Tests for createNewTodo", () => {
    
    test("Should trigger CreateHTML", () => {
        // 1 arrange
        let todos: Todo[] = [];
        let text = 'do something';
        let spy = jest.spyOn(main, "createHtml").mockReturnValue();

        // 2 act
        main.createNewTodo(text, todos);

        // 3 assert
        expect(spy).toBeCalled();
        expect(todos.length).toBe(1);

    });

    test("Should NOT trigger CreateHTML, display error", () => {
        // 1 arrange
      
        let todosList: Todo[] = [];
        let text = 'x';
        let spy2 = jest.spyOn(main, "displayError").mockReturnValue();

        // 2 act
        main.createNewTodo(text, todosList);

        // 3 assert
        expect(spy2).toBeCalled();
        expect(todosList.length).toBe(0);

    });

});

describe("Tests for clearTodos", () => {
    
    test("Should trigger removeAllTodos & createHtml", () => {
        // 1 arrange
        let todos: Todo[] = [];
        let spy007 = jest.spyOn(functions, "removeAllTodos").mockReturnValue();
        let spy008 = jest.spyOn(main, "createHtml").mockReturnValue();

        // 2 act
        main.clearTodos(todos);
        
        // 3 assert
        expect(spy007).toBeCalled();
        expect(spy008).toBeCalled();
    }
    );
});

describe("Tests for toggleTodo", () => {
    
    test("Should trigger changeTodo & createHTML", () => {
        // 1 arrange
        let newDodos: Todo = {text: "something", done: true};
        let jamesBond = jest.spyOn(functions, "changeTodo").mockReturnValue();
        let ethanHunt = jest.spyOn(main, "createHtml").mockReturnValue();

        // 2 act
        main.toggleTodo(newDodos);
        
        // 3 assert
        expect(jamesBond).toBeCalled();
        expect(ethanHunt).toBeCalled();

        ethanHunt.mockRestore();
    }
    );
});

describe("Tests for createHtml", () => {

    test("should produce todo lists", () => {
        // 1 arrange
        document.body.innerHTML = `
        <form id="newTodoForm">
        <div>
            <input type="text" id="newTodoText" />
            <button>Skapa</button>
            <button type="button" id="clearTodos">Rensa lista</button>
        </div>
        <div id="error" class="error"></div>
        </form>
        <ul id="todos" class="todo">
            <li></li>
            <li></li>
            <li></li>
        </ul>
        `;

        let listOfTodos: Todo[] = [
            { text: 'blabla', done: false },
            { text: 'wowowo', done: false },
            { text: 'hejhej', done: false }
        ];

        // 2 act
        createHtml(listOfTodos);
        let todoLI: NodeListOf<HTMLLIElement> = document.querySelectorAll(".todo__text") as NodeListOf<HTMLLIElement>;
        Array.from(todoLI);
        
        
        
        // 3 assert
        expect(todoLI.length).toBe(3);
        

    });

    test("should find done todo in html LI", () => {
        // 1 arrange
        document.body.innerHTML = `
        <form id="newTodoForm">
        <div>
            <input type="text" id="newTodoText" />
            <button>Skapa</button>
            <button type="button" id="clearTodos">Rensa lista</button>
        </div>
        <div id="error" class="error"></div>
        </form>
        <ul id="todos" class="todo">
            <li></li>
            <li></li>
            <li></li>
        </ul>
        `;

        let listOfTodos: Todo[] = [
            { text: 'blabla', done: false },
            { text: 'wowowo', done: true },
            { text: 'hejhej', done: false }
        ];

        // 2 act
        createHtml(listOfTodos);
        let todoLI: HTMLLIElement = document.querySelector(".todo__text--done") as HTMLLIElement;
        
        // 3 assert
        expect(todoLI.innerHTML).toBe("wowowo");
        

    });

})