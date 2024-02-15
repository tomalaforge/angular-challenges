import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TodosComponent } from './components';

@Component({
  standalone: true,
  imports: [CommonModule, MatCardModule, TodosComponent],
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container">
      <mat-card>
        <mat-card-content>
          <app-todos></app-todos>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: `
    mat-card {
      width: fit-content;
      margin: 20px auto;
    }
  `,
})
export class AppComponent {}
