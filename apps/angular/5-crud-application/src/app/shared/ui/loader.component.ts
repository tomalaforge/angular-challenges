import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderService } from '../../core/services/loader.service';

@Component({
  selector: 'app-loader',
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    @if (isLoading()) {
      <div class="loader-backdrop">
        <div class="loader-spinner">
          <mat-spinner></mat-spinner>
        </div>
      </div>
    }
  `,
})
export class LoaderComponent {
  loaderService = inject(LoaderService);

  isLoading = this.loaderService.isLoading;
}
