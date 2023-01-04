import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  NgZone,
} from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, fromEvent, tap } from 'rxjs';
import { NgxDirtyCheckerModule } from '@code-workers.io/ngx-dirty-checker';

@Component({
  standalone: true,
  imports: [NgIf, AsyncPipe, NgxDirtyCheckerModule],
  selector: 'app-root',
  template: `
    <ngx-dirty-checker></ngx-dirty-checker>
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

  private displayButtonSubject = new BehaviorSubject<boolean>(false);
  displayButton$ = this.displayButtonSubject.asObservable().pipe(
    distinctUntilChanged(),
    tap({
      next: (x) => this.cd.detectChanges(),
    })
  );

  constructor(
    private zone: NgZone,
    private el: ElementRef,
    private cd: ChangeDetectorRef
  ) {
    this.zone.runOutsideAngular(() => {
      fromEvent(window, 'scroll').subscribe((_) => {
        const pos = window.pageYOffset;
        this.displayButtonSubject.next(pos < 50);
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
