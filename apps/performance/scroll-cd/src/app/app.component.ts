import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  HostListener,
  inject,
  NgZone,
  OnInit,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DOCUMENT } from '@angular/common';

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
export class AppComponent implements OnInit {
  private readonly document = inject(DOCUMENT);
  private readonly ngZone = inject(NgZone);
  private readonly cdRef = inject(ChangeDetectorRef);

  title = 'scroll-cd';

  private displayButtonSubject = new BehaviorSubject<boolean>(false);
  displayButton$ = this.displayButtonSubject.asObservable();

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.document.addEventListener('scroll', this.onScroll.bind(this));
    });
  }

  onScroll() {
    const pos = window.pageYOffset;
    const displayButton: boolean = this.displayButtonSubject.value;

    if (pos > 50 && !displayButton) {
      this.onChangeDisplayButton(true);
    }

    if (pos < 50 && displayButton) {
      this.onChangeDisplayButton(false);
    }
  }

  onChangeDisplayButton(isShowButton: boolean) {
    this.displayButtonSubject.next(isShowButton);
    this.cdRef.detectChanges();
  }

  goToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
