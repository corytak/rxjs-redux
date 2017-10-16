import { stateAndDispatcher } from './../dispatch';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoComponent } from './todo-list/todo/todo.component';
import { FilterLinkComponent } from './filter-selector/filter-link/filter-link.component';
import { FilterSelectorComponent } from './filter-selector/filter-selector.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterLinkComponent,
    FilterSelectorComponent,
    TodoComponent,
    TodoListComponent,
    AddTodoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: stateAndDispatcher,
  bootstrap: [AppComponent]
})
export class AppModule { }
