import { NgIf } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PushModule } from '@rx-angular/template/push';
import { listenOutsideZone } from './listen-outside-zone.util';
@Component({
  standalone: true,
  imports: [NgIf, PushModule],
  selector: 'app-root',
  template: `
    <div>Top</div>
    <div>Middle</div>
    <div>Bottom</div>
    <button (click)="goToTop()" *ngIf="displayButton$ | push">Top</button>
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
export class AppComponent implements OnDestroy {
  title = 'scroll-cd';

  private displayButtonSubject = new BehaviorSubject<boolean>(false);
  displayButton$ = this.displayButtonSubject.asObservable();

  scrollListener = listenOutsideZone(window, 'scroll', () => {
    const pos = window.pageYOffset;
    this.displayButtonSubject.next(pos > 50);
  });

  ngOnDestroy(): void {
    this.scrollListener();
  }

  goToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
