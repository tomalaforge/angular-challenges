import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { ITodo } from './app.interface';
import { TodosHttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class TodoStore {
  private todosHttpService: TodosHttpService = inject(TodosHttpService);

  public todos: WritableSignal<ITodo[]> = signal<ITodo[]>([]);
  public isLoading: WritableSignal<boolean> = signal<boolean>(false);

  public getAll(): void {
    this.isLoading.set(true);

    this.todosHttpService.getAll().subscribe({
      next: (todos: ITodo[]) => this.todos.set(todos),
      error: (err) => {
        console.error('An error occurred: ', err);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }

  public updateTodo(todo: ITodo): void {
    this.isLoading.set(true);

    this.todosHttpService.update(todo).subscribe({
      next: (updatedTodo: ITodo) => {
        this.todos.update((todos) =>
          todos.reduce<ITodo[]>(
            (updatedTodos, currentTodo) => [
              ...updatedTodos,
              currentTodo.id === updatedTodo.id ? updatedTodo : currentTodo,
            ],
            [],
          ),
        );
      },
      error: (err) => {
        console.error('An error occurred: ', err);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }

  public deleteOne(id: number) {
    this.isLoading.set(true);

    this.todosHttpService.delete(id).subscribe({
      next: () => this.todos.set(this.todos().filter((s) => s.id !== id)),
      error: (err) => {
        console.error('An error occurred: ', err);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }
}
