import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ItemComponent } from './components/item.component';
import { todoStore } from './todo.store';

@Component({
  standalone: true,
  imports: [CommonModule, ItemComponent, MatProgressSpinnerModule],
  selector: 'app-root',
  template: `
    <div class="basic-container" style="margin: 2rem;">
      @if (todosStore.isLoading()) {
        <mat-spinner color="blue"></mat-spinner>
      }
      @for (todo of todosStore.todos(); track todo.id) {
        <app-item style="margin-left: 5px;" [todo]="todo"></app-item>
      }
    </div>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  todosStore = inject(todoStore);

  ngOnInit(): void {
    this.todosStore.getTodos();
  }
}
