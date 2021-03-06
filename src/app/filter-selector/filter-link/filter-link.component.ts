import { Component, Inject, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import { AppState, stateAndDispatcher, state, dispatcher } from '../../../dispatch';
import { Action, SetVisibilityFilter } from '../../../actions';

@Component({
  selector: 'app-filter-link',
  styles: [
    `
      div {
        cursor: pointer;
      }

      div:hover {
        font-weight: bold;
      }
      `
  ],
  template: `
        <div (click)="setVisibilityFilter()" [style.text-decoration]="textEffect | async"> {{ filter }} </div>
    `,
})
export class FilterLinkComponent {
  @Input() public filter: string;

  constructor( @Inject(dispatcher) private dispatcher: Observer<Action>,
    @Inject(state) private state: Observable<AppState>) {
  }

  public get textEffect() {
    return this.state.map(s =>
      s.visibilityFilter === this.filter ? 'underline' : 'none');
  }

  public setVisibilityFilter() {
    const action: SetVisibilityFilter = new SetVisibilityFilter(this.filter);
    this.dispatcher.next(action);
  }
}
