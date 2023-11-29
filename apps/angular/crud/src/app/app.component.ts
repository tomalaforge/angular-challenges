import { CommonModule } from '@angular/common';
import { Component, OnInit, effect, inject } from '@angular/core';
import { TodoService } from './service/todo.service';
import { TodoComponent } from './component/todo.component';
import { LoadingService } from './service/loading.service';
import { LoadingComponent } from './component/loading.component';

@Component({
  standalone: true,
  imports: [CommonModule, TodoComponent, LoadingComponent],
  selector: 'app-root',
  template: `
    @if (loadingService.loading()) {
      <app-loading />
    }
    @for (todo of todoService.todoList(); track $index) {
      <app-todo [todo]="todo" />
    }
  `,
})
export class AppComponent implements OnInit {
  todoService: TodoService = inject(TodoService);
  loadingService: LoadingService = inject(LoadingService);

  constructor() {
    effect(() => {
      if (this.todoService.todoError() !== '') {
        console.error(this.todoService.todoError());
      }
    });
  }

  ngOnInit(): void {
    this.todoService.callTodoList();
  }
}
