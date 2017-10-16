import { AppState, state } from './../dispatch';
import { Observable } from 'rxjs/Observable';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor( @Inject(state) private state: Observable<AppState>) {
  }
}
