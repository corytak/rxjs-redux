import { OpaqueToken, InjectionToken } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/zip';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/scan';

import { Action, ToggleTodoAction, SetVisibilityFilter, AddTodoAction } from './actions';

export class ToDoItem {
    constructor(public id: number, public text: string, public completed: boolean = false) { }
}

export class AppState {
    public todos: Array<ToDoItem>;
    public visibilityFilter;
    constructor() { }
}

export const initState = new InjectionToken('initState');
export const dispatcher = new InjectionToken('dispatcher');
export const state = new InjectionToken('state');

// this is what is actually injected in the app component when using 'providers: stateAndDispatcher'
export const stateAndDispatcher = [
    {
        provide: initState,
        useValue: {
            todos: [
                new ToDoItem(0, 'Eeny', false),
                new ToDoItem(1, 'Meeny', false),
                new ToDoItem(2, 'Miny', true),
                new ToDoItem(3, 'Moe', false),
            ],
            visibilityFilter: 'SHOW_ALL'
        }
    },
    {
        provide: dispatcher,
        useValue: new Subject<Action>()
    },
    {
        provide: state,
        useFactory: stateFn,
        deps: [initState, dispatcher]
    }
];

function stateFn(initialState: AppState, actions: Observable<Action>): Observable<AppState> {
    const combine = s => ({ todos: s[0], visibilityFilter: s[1] });
    const appStateObs: Observable<AppState> =
        todos(initialState.todos, actions)
            .zip(filter(initialState.visibilityFilter, actions))
            .map(combine);
    return wrapIntoBehavior(initialState, appStateObs);
}

function wrapIntoBehavior(init, obs) {
    const res = new BehaviorSubject(init);
    obs.subscribe(s => res.next(s));
    return res;
}

function todos(initialState: any, actions: Observable<Action>): Observable<ToDoItem> {
    return actions.scan((ste, action) => {
        if (action instanceof AddTodoAction) {
            const newTodo = {
                id: action.todoId,
                text: action.text,
                completed: false
            };
            return [...ste, newTodo];
        } else {
            return ste.map(t => updateTodo(t, action));
        }
    }, initialState);
}

function updateTodo(todo: ToDoItem, action: Action): ToDoItem {
    if (action instanceof ToggleTodoAction) {
        return (action.id !== todo.id) ? todo : merge(todo, { completed: !todo.completed });
    } else {
        return todo;
    }
}

function filter(initialState: string, actions: Observable<Action>): Observable<string> {
    return actions.scan((ste, action) => {
        if (action instanceof SetVisibilityFilter) {
            return action.filter;
        } else {
            return ste;
        }
    }, initialState);
}

function merge(todo: ToDoItem, props: any): any {
    return Object.assign({}, todo, props);
}
