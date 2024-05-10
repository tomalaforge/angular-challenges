import {
  ChangeDetectionStrategy,
  Component,
  NgZone,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, fromEvent, map } from 'rxjs';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-root',
  template: `
    <div>Top</div>
    <div>Middle</div>
    <div>Bottom</div>
    @if (displayButton()) {
      <button (click)="goToTop()">Top</button>
    }
  `,
  styles: [
    `
      :host {
        height: 1500px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        button {
          position: fixed;
          bottom: 1rem;
          left: 1rem;
          z-index: 1;
          padding: 1rem;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  // We're not yet to full signal-based components...
  displayButton = signal(false);

  private readonly ngZone = inject(NgZone);

  // inspired by https://blog.simplified.courses/the-danger-of-angular-host-listeners/
  constructor() {
    this.ngZone.runOutsideAngular(() => {
      fromEvent(window, 'scroll')
        .pipe(
          map(() => 50 < window.scrollY),
          distinctUntilChanged(),
          takeUntilDestroyed(),
        )
        .subscribe({
          next: (display) =>
            this.ngZone.run(() => this.displayButton.set(display)),
        });
    });
  }

  goToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
