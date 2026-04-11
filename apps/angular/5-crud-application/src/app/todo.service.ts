import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { API_CONFIG } from './core/provide-api-config';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly http = inject(HttpClient);
  private readonly apiConfig = inject(API_CONFIG);
  private readonly apiUrl = `${this.apiConfig.baseUrl}/todos`;
  readonly todoList = signal<Todo[] | null>(null);
  readonly loadingState = signal(false);
  readonly errorState = signal<string | null>(null);
  private readonly processingIds = signal<Set<number>>(new Set());

  readonly todos = this.todoList.asReadonly();

  loadTodos(): void {
    this.loadingState.set(true);
    this.errorState.set(null);
    this.http.get<Todo[]>(this.apiUrl).subscribe({
      next: (todos) => {
        this.todoList.set(todos);
        this.loadingState.set(false);
      },
      error: (error) => {
        this.errorState.set('Failed to load todos');
        this.loadingState.set(false);
      },
    });
  }

  updateTodo(todo: Todo): void {
    this.loadingState.set(true);
    this.setProcessing(todo.id, true);
    this.http
      .put<Todo>(`${this.apiUrl}/${todo.id}`, todo, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .subscribe({
        next: (updatedTodo) => {
          const currentTodos = this.todoList();
          if (currentTodos) {
            const index = currentTodos.findIndex(
              (t) => t.id === updatedTodo.id,
            );
            if (index !== -1) {
              const updatedTodos = [...currentTodos];
              updatedTodos[index] = updatedTodo;
              this.todoList.set(updatedTodos);
            }
          }
          this.setProcessing(todo.id, false);
          this.loadingState.set(false);
        },
        error: () => {
          this.errorState.set('Failed to update todo');
          this.setProcessing(todo.id, false);
        },
      });
  }

  deleteTodo(id: number): void {
    this.setProcessing(id, true);
    this.loadingState.set(true);
    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        const currentTodos = this.todoList();
        if (currentTodos) {
          this.todoList.set(currentTodos.filter((t) => t.id !== id));
        }
        this.setProcessing(id, false);
        this.loadingState.set(false);
      },
      error: () => {
        this.errorState.set('Failed to delete todo');
        this.setProcessing(id, false);
      },
    });
  }

  setTodo(userValue: Todo[] | null): void {
    this.todoList.set(userValue);
  }

  isProcessing(id: number): boolean {
    return this.processingIds().has(id);
  }

  private setProcessing(id: number, processing: boolean): void {
    this.processingIds.update((ids) => {
      const nextIds = new Set(ids);

      if (processing) {
        nextIds.add(id);
      } else {
        nextIds.delete(id);
      }

      return nextIds;
    });
  }
}
