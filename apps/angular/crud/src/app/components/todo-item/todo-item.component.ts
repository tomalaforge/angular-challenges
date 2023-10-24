import { Component, Input, OnInit, inject } from '@angular/core';
import { ITodo } from '../../models/todo.model';
import { TodoService } from '../../data-access/todo.service';

@Component({
  selector: 'app-todo-item',
  template:
    `
  <div class="single-todo">
    <span> {{ todoItem.title }} </span>
    <span class="actions">
      <button (click)="this.todoService.update(todoItem)">Update</button>
      <button (click)="this.todoService.delete(todoItem)">Delete</button>
    </span>
  </div>
  `,
  standalone: true,
  styles: [
    `
      .single-todo {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 5px;
        paddiing: 5px;
      }

      .actions{
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .actions button {
        margin: 5px;
        padding: 5px 10px;
      }`
  ]
})

export class TodoItemComponent implements OnInit {
  todoService = inject(TodoService);
  @Input() todoItem!: ITodo;

  constructor() { }

  ngOnInit() { }
}