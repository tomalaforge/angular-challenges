import { Component, OnInit, signal } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AppHttpService } from './app-http.service';
import { ToDo } from './todo.interface';

@Component({
  standalone: true,
  imports: [MatProgressSpinner],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent implements OnInit {
  public todos = signal([] as Array<ToDo>);

  constructor(private toDoService: AppHttpService) {}

  ngOnInit(): void {
    this.toDoService.getTodos$().subscribe((todos) => {
      this.todos.set(todos);
    });
  }

  public update(todo: ToDo): void {
    this.toDoService.updateTodo$(todo).subscribe((todoUpdated) => {
      this.todos.update((values) => {
        const index = values.findIndex((value) => value.id === todoUpdated.id);
        if (index > -1) {
          values[index] = todoUpdated;
        }
        return values;
      });
    });
  }

  public delete(id: number): void {
    this.toDoService.deleteTodo$(id).subscribe(() => {
      this.todos.update((values) => {
        return values.filter((value) => value.id !== id);
      });
    });
  }
}
