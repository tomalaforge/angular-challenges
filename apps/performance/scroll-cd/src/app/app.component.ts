import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  NgZone,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  standalone: true,
  imports: [NgIf, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  private readonly zone = inject(NgZone);
  private readonly cdr = inject(ChangeDetectorRef);
  private displayButtonSubject = new BehaviorSubject<boolean>(false);
  displayButton$ = this.displayButtonSubject.asObservable();

  ngOnInit() {
    this.zone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.onScroll.bind(this));
    });
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onScroll.bind(this));
  }

  onScroll() {
    const pos = window.pageYOffset > 50;
    const buttonValue = this.displayButtonSubject.value;
    this.displayButtonSubject.next(pos);
    if (buttonValue === pos) return;
    this.cdr.detectChanges();
  }

  goToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
