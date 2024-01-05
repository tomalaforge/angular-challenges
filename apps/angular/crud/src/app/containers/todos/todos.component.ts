import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { TodoComponent } from '../../components/todo/todo.component';
import { Todo, TodoService } from '../../services/todo.service';
import { Store } from '../../store';

@Component({
  standalone: true,
  selector: 'app-todos',
  template: `
    <div>
      @for (todo of todos$ | async; track todo.id) {
        <app-todo
          [todo]="todo"
          (update)="update($event)"
          (delete)="delete($event)"></app-todo>
      }
    </div>
  `,
  providers: [TodoService],
  imports: [AsyncPipe, TodoComponent],
})
export class TodosComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  todos$!: Observable<Todo[]>;

  constructor(
    private store: Store,
    private todoService: TodoService,
  ) {}

  ngOnInit() {
    this.todos$ = this.store.select<Todo[]>('todos');
    this.todoService.todos$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  update(todo: Todo) {
    this.todoService.update(todo);
  }

  delete(id: number) {
    this.todoService.delete(id);
  }
}
