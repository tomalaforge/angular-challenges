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

  updateTodo($event: TodoDetails) {
    this.todoList = this.todos();
  }

  deleteTodo($event: TodoDetails) {
    //this.todoList = this.todos();
    // const index = this.todoList.findIndex(td => td.id === $event.id);
    // this.todoList.splice(index,1);
    //this.todoList = [...this.todos().filter(g=> g.id !== $event.id)];
    this.todos = signal([...this.todos().filter((g) => g.id !== $event.id)]);
  }
}
