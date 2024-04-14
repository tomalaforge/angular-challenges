import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { injectQueryClient } from '@tanstack/angular-query-experimental';
import { TodosComponent } from './components/todos/todos.component';

@Component({
  standalone: true,
  imports: [CommonModule, MatProgressBarModule, TodosComponent],
  selector: 'app-root',
  template: `
    @if (queryClient.isFetching()) {
      <mat-progress-bar mode="indeterminate"></mat-progress-bar>
    }
    <app-todos />
  `,
  styles: [],
})
export class AppComponent {
  public queryClient = injectQueryClient();
}
