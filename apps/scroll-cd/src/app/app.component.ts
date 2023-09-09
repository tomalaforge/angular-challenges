import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, HostListener } from '@angular/core';

@Component({
  standalone: true,
  imports: [NgIf, AsyncPipe],
  selector: 'app-root',
  template: `
    <div>Top</div>
    <div>Middle</div>
    <div>Bottom</div>
    <button (click)="goToTop()" *ngIf="displayButton">Top</button>
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

  displayButton = false;

  constructor(private cd: ChangeDetectorRef) {
    cd.detach();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const pos = window.pageYOffset;
    if (pos > 50) {
      if (!this.displayButton) {
        this.displayButton = true;
        this.cd.detectChanges();
      }
    } else {
      if (this.displayButton) {
        this.displayButton = false;
        this.cd.detectChanges();
      }
    }
  }

  goToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
