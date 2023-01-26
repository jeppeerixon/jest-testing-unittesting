/**
 * @jest-environment jsdom
*/
import { displayError, toggleTodo } from "../main";
import { addTodo, changeTodo, removeAllTodos } from "../functions";
import { Todo } from "../models/Todo";
import * as main from "../main";
import * as functions from "../functions";

describe("Tests for displayError function", () => {
    
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

        // 3 assert
        expect(errorDiv.classList.contains('show')).toBe(true);
        // kanske lägg till extra expect?
    });

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
        let textToSend: string = "error message";

        // 2 act
        displayError(textToSend, false)

        // 3 assert
        expect(errorDiv.classList.contains('show')).toBe(false);
        // kanske lägg till extra expect?
    });

});

describe("Tests for createNewTodo", () => {
    
    test("Should trigger CreateHTML", () => {
        // 1 arrange
        let todos: Todo[] = [];
        let text = 'do something';
        let result = addTodo(text, todos);
        let spy = jest.spyOn(main, "createHtml").mockReturnValue();

        main.createNewTodo(text, todos);

        // 2 act
        if (result.success) {
            // 3 assert
            expect(spy).toBeCalled();
            expect(result.error).toBe("");
        }

    });

    test("Should NOT trigger CreateHTML, display error", () => {
        // 1 arrange
      
        let todos: Todo[] = [];
        let text = 'x';
        let result1 = addTodo(text, todos);
        let spy2 = jest.spyOn(main, "createHtml").mockReturnValue();
        result1.success = false;

        // 2 act
        main.createNewTodo(text, todos);
        if (result1.success == false) {
            // 3 assert
            expect(spy2).toBeCalled();
            expect(result1.error).toBe("Du måste ange minst tre bokstäver");
        }

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
        let newDodos: Todo = {text: "bajs", done: true};
        let jamesBond = jest.spyOn(functions, "changeTodo").mockReturnValue();
        let ethanHunt = jest.spyOn(main, "createHtml").mockReturnValue();

        // 2 act
        main.toggleTodo(newDodos);
        
        // 3 assert
        expect(jamesBond).toBeCalled();
        expect(ethanHunt).toBeCalled();
    }
    );
});