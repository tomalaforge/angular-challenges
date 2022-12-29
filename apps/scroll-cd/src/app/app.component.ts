import { AsyncPipe, NgIf } from '@angular/common';
import { Component, NgZone, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import {
  BehaviorSubject,
  distinctUntilChanged,
  Observable,
  OperatorFunction,
} from 'rxjs';

function runInZone<T>(zone: NgZone): OperatorFunction<T, T> {
  return (source) => {
    return new Observable((observer) => {
      return source.subscribe({
        next: (value) => zone.run(() => observer.next(value)),
        error: (e) => zone.run(() => observer.error(e)),
        complete: () => zone.run(() => observer.complete()),
      });
    });
  };
}

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
export class AppComponent implements OnInit, OnDestroy {
  title = 'scroll-cd';

  private readonly listeners: (() => void)[] = [];
  private readonly displayButtonSubject = new BehaviorSubject<boolean>(false);

  displayButton$ = this.displayButtonSubject.pipe(
    distinctUntilChanged(),
    runInZone(this.zone)
  );

  constructor(
    private readonly zone: NgZone,
    private readonly renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      this.listeners.push(
        this.renderer.listen(window, 'scroll', () => this.onScroll())
      );
    });
  }

  ngOnDestroy(): void {
    this.listeners.forEach((item) => item());
  }

  onScroll() {
    const pos = window.pageYOffset;
    this.displayButtonSubject.next(pos > 50);
  }

  goToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
