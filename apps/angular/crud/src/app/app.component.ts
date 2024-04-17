import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, WritableSignal } from '@angular/core';
import { MatProgressBar } from '@angular/material/progress-bar';
import { Store } from '@ngrx/store';

import { ITodo } from './interfaces/ITodo';
import { todoActions } from './states/todos/todo.actions';
import { selectList } from './states/todos/todo.reducer';
import { LoaderService } from './ui/loader/loader.service';
import { TodoComponent } from './ui/todo/todo.component';

@Component({
  standalone: true,
  imports: [CommonModule, MatProgressBar, TodoComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent implements OnInit {
  public loaderService = inject(LoaderService);
  private store = inject(Store);

  todos = this.store.selectSignal(selectList) as WritableSignal<ITodo[]>;

  ngOnInit(): void {
    this.store.dispatch(todoActions.loadTodosAction());
  }
}
