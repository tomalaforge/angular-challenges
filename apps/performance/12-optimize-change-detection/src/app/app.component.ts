import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  NgZone,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  standalone: true,
  imports: [NgIf, AsyncPipe],
  selector: 'app-root',
  template: `
    <div class="fixed left-0 top-0 w-full bg-white p-4 shadow">Top</div>
    <div class="my-[50vh] text-center">Middle</div>
    <div class="mb-20 text-center">Bottom</div>

    <button
      *ngIf="displayButton$ | async"
      (click)="goToTop()"
      class="fixed bottom-4 left-4 rounded-lg bg-blue-600 px-4 py-2
             text-white shadow-lg transition-all hover:bg-blue-700
             focus:outline-none focus:ring-2 focus:ring-blue-500
             focus:ring-offset-2">
      Back to Top
    </button>
  `,
  styles: [
    `
      :host {
        min-height: 150vh;
        display: block;
      }
    `,
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  private displayButtonSubject = new BehaviorSubject<boolean>(false);
  displayButton$ = this.displayButtonSubject.asObservable();

  private scrollHandler: () => void;
  private lastState = false;

  constructor(
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
  ) {
    this.scrollHandler = () => {
      const shouldShow = window.pageYOffset > 50;
      if (shouldShow !== this.lastState) {
        this.lastState = shouldShow;
        this.displayButtonSubject.next(shouldShow);
        this.cdr.detectChanges();
      }
    };
  }

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.scrollHandler, { passive: true });
    });
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scrollHandler);
  }

  goToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
