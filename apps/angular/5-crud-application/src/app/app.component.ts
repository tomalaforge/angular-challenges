import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToDoComponent } from '../components/to-do/to-do.component';
import { TodoDetails } from '../model/user';
import { CrudSpecialService } from '../services/crud-special.service';
@Component({
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, ToDoComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  public loading = true;

  constructor(private todoService: CrudSpecialService) {}

  todos = this.todoService.allTodos;
  todoList!: TodoDetails[];

  updateTodo() {
    this.todoList = this.todos();
  }

  deleteTodo($event: TodoDetails) {
    this.todos = signal([...this.todos().filter((g) => g.id !== $event.id)]);
  }
}
