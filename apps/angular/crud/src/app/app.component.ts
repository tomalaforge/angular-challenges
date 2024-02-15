import { CommonModule } from '@angular/common';
import { Component, OnInit, WritableSignal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Todo } from './models';
import { TodoService } from './services';

@Component({
  standalone: true,
  imports: [CommonModule, MatCardModule],
  selector: 'app-root',
  template: `
    <div class="container">
      <mat-card>
        <mat-card-content>
          <ul>
            @for (todo of todos(); track todo.id) {
              <li>
                <app-todo-list-item></app-todo-list-item>
              </li>
            }
          </ul>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: `
    mat-card {
      width: fit-content;
      margin: 20px auto;
    }

    ul {
      list-style-type: none;
      padding-inline-start: 0px;
    }
  `,
})
export class AppComponent implements OnInit {
  todos: WritableSignal<Todo[]> = this.todoService.todos;

  constructor(private readonly todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getAll();
  }
}
