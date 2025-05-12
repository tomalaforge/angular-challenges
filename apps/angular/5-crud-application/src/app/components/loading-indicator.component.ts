import { Component, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-global-loading-indicator',
  imports: [MatProgressSpinnerModule],
  template: `
    @if (loading) {
      <div class="loading-overlay">
        <mat-spinner />
      </div>
    }
  `,
  styles: [
    `
      .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `,
  ],
})
export class GlobalLoadingIndicatorComponent {
  @Input() loading!: boolean | null;
}
