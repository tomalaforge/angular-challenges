import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TodoService } from './services/todo.service';
import { Todo } from './models/todo.model';
import { Subscription } from 'rxjs';
import { randText } from '@ngneat/falso';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent implements OnInit, OnDestroy {
  todos!: Todo[];
  isLoading!: boolean;
  private todosSubscription!: Subscription;
  private isLoadingSubscription!: Subscription;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.isLoadingSubscription = this.todoService.isLoading.subscribe(
      (loading) => {
        this.isLoading = loading;
      }
    );

    this.todoService.getTodos();

    this.todosSubscription = this.todoService.todos.subscribe((todos) => {
      this.todos = todos;
    });
  }

  updateTodo(todo: Todo): void {
    this.todoService.updateTodoById(todo.id, { ...todo, title: randText() });
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodoById(id);
  }

  ngOnDestroy(): void {
    this.todosSubscription.unsubscribe();
    this.isLoadingSubscription.unsubscribe();
  }
}
