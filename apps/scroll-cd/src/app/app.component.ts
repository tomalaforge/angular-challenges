import { AsyncPipe, DOCUMENT, NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  distinctUntilChanged,
  fromEvent,
  map,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';

@Component({
  standalone: true,
  imports: [NgIf, AsyncPipe],
  selector: 'app-root',
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

  destroy = new Subject();
  destroy$ = this.destroy.asObservable();

  displayButton$ = fromEvent(window, 'scroll').pipe(
    takeUntil(this.destroy$),
    map(
      () => window.pageYOffset || this.document.documentElement.pageYOffset || 0
    ),
    map((pageYOffset: number) => pageYOffset > 50),
    distinctUntilChanged()
  );

  constructor(
    @Inject(DOCUMENT)
    private document: { documentElement: { pageYOffset: number } }
  ) {}

  ngOnDestroy(): void {
    this.destroy.next(true);
  }

  goToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
