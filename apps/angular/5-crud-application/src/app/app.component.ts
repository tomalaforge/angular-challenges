import { NgFor } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor],
  template: `
    <div *ngFor="let todo of todoService.todoList()">
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
      <button (click)="delete(todo.id)">Delete</button>
    </div>
  `,
})
export class AppComponent implements OnInit {
  todoService = inject(TodoService);

  ngOnInit(): void {
    this.todoService.loadTodos().subscribe();
  }

  update(todo: { id: number; title: string; completed: boolean }) {
    this.todoService.update(todo).subscribe();
  }

  delete(id: number) {
    this.todoService.delete(id).subscribe();
  }
}
