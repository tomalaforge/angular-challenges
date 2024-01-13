import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderService } from '../../data-access/loader.service';
@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    @if (loader.isLoading$()) {
      <div class="container">
        <mat-spinner></mat-spinner>
        <mat-progress-spinner value="0"></mat-progress-spinner>
      </div>
    }
  `,
})
export class SpinnerComponent {
  loader = inject(LoaderService);
}
