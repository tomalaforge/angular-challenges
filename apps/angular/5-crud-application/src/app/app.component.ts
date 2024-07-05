import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TodosFacadeService } from './core/services/todos/TodosFacade.service';
import { ItemComponent } from './item-component/Item.component';

@Component({
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, ItemComponent],
  selector: 'app-root',
  template: `
    @for (todo of todoService.getTodoList(); track todo.id) {
      <app-item [todo]="todo"></app-item>
    } @empty {
      <div>No todos</div>
    }
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  todoService = inject(TodosFacadeService);

  ngOnInit(): void {
    this.todoService.fetchTodos();
  }
}
