import { Component, inject, OnInit } from '@angular/core';

import { FakeHttpService } from './data-access/fake-http.service';
import { TODO } from './model/todo.model';

@Component({
  imports: [],
  selector: 'app-root',
  template: `
    <div class="table-design"></div>
    <table border="1">
      <thead>
        <tr>
          <th>Title</th>
          <th>Update</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        @for (todo of todos(); track todo.id) {
          <tr>
            <td>{{ todo.title }}</td>
            <td>
              <button (click)="update(todo)">Update</button>
            </td>
            <td>
              <button (click)="delete(todo)">Delete</button>
            </td>
          </tr>
        }
      </tbody>
    </table>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  fakehttpService = inject(FakeHttpService);
  readonly todos = this.fakehttpService.todoSignal;

  ngOnInit(): void {
    this.fakehttpService.getAllTodos();
  }

  update(todo: TODO) {
    this.fakehttpService.updateTodo(todo);
  }
  delete(todo: TODO) {
    this.fakehttpService.deleteTodo(todo);
  }
}
