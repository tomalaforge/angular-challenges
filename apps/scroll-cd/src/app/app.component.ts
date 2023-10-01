import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  NgZone,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, distinctUntilChanged, fromEvent, map } from 'rxjs';

@Component({
  standalone: true,
  imports: [NgIf, AsyncPipe],
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>Top</div>
    <div>Middle</div>
    <div>Bottom</div>
    <button (click)="goToTop()" *ngIf="displayButton$ | async">Top</button>
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
})
export class AppComponent {
  title = 'scroll-cd';
  ngZone = inject(NgZone);
  private displayButtonSubject = new BehaviorSubject<boolean>(false);
  displayButton$ = this.displayButtonSubject.asObservable();

  constructor() {
    this.ngZone.runOutsideAngular(() => {
      fromEvent(window, 'scroll')
        .pipe(
          map(() => window.scrollY > 50),
          distinctUntilChanged(),
          takeUntilDestroyed()
        )
        .subscribe((shouldDisplay) =>
          this.ngZone.run(() => this.displayButtonSubject.next(shouldDisplay))
        );
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
