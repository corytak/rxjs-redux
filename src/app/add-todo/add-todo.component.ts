import { Component, Inject, OnInit } from '@angular/core';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { stateAndDispatcher, dispatcher, state, AppState } from '../../dispatch';
import { Action, AddTodoAction } from '../../actions';

@Component({
    selector: 'app-add-todo',
    template: `
        <input [(ngModel)]="text" (keydown.Enter)="addTodo()">
        <button [disabled]="isTextEmpty" (click)="addTodo()">Add Todo</button>
    `,
    providers: stateAndDispatcher,
})
export class AddTodoComponent implements OnInit {
    public text: string;
    private nextId = 0;

    constructor(
        @Inject(state) private state: Observable<AppState>,
        @Inject(dispatcher) private dispatcher: Observer<Action>) {
    }

    public ngOnInit(): void {
        this.resetText();
        this.state.forEach(s => {
            this.nextId = s.todos.length;
        });
    }

    public get isTextEmpty(): boolean {
        return this.text === '';
    }

    public addTodo(): void {
        if (this.isTextEmpty === false) {
            const action: AddTodoAction = new AddTodoAction(this.nextId++, this.text);
            this.dispatcher.next(action);
            this.resetText();
        }
    }

    private resetText(): void {
        this.text = '';
    }
}
