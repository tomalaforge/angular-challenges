import { computed, inject, Injectable, signal } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { CoreHttpService } from '../http/CoreHttp.service';

/**
 * Service responsible for managing todo items.
 * Provides functionality to fetch, update, and delete todos using the CoreHttpService.
 */
@Injectable({
  providedIn: 'root',
})
export class TodosFacadeService {
  private readonly coreHttp = inject(CoreHttpService);

  #todoList = signal<Todo[]>([]); // Holds the current state of todos.

  /**
   * Fetches all todos from the server and updates the local todo list.
   */
  public fetchTodos(): void {
    this.coreHttp.get<Todo[]>('/todos').subscribe((todos) => {
      this.#todoList.update(() => todos);
    });
  }

  /**
   * Returns the list of todos as a computed property.
   * @returns An array of Todo items.
   */
  public getTodoList = computed<Todo[]>(() => {
    return this.#todoList();
  });

  /**
   * Updates a todo item based on its id.
   * @param todoToEdit The todo item to be updated.
   */
  public updateTodo(todoToEdit: Todo): void {
    this.coreHttp
      .put<Todo>(`/todos/${todoToEdit.id}`, todoToEdit)
      .subscribe((todoUpdated: Todo) => {
        this.#todoList.update((list) =>
          list.map((todo) => (todo.id === todoToEdit.id ? todoUpdated : todo)),
        );
      });
  }

  /**
   * Deletes a todo item based on its id.
   * @param todoToDelete The todo item to be deleted.
   */
  public deleteTodo(todoToDelete: Todo): void {
    this.coreHttp.delete<Todo>(`/todos/${todoToDelete.id}`).subscribe(() => {
      this.#todoList.update((list) =>
        list.filter((todo) => todo.id !== todoToDelete.id),
      );
    });
  }
}
