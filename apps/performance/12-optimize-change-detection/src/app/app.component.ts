import { NgIf } from '@angular/common';
import { Component, computed, inject, NgZone, signal } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  standalone: true,
  imports: [NgIf],
  selector: 'app-root',
  template: `
    <div>Top</div>
    <div>Middle</div>
    <div>Bottom</div>
    <button (click)="goToTop()" *ngIf="displayButton()">Top</button>
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
  private ngZone = inject(NgZone);

  private shouldDisplayButton = signal(false);
  displayButton = computed(() => this.shouldDisplayButton());

  constructor() {
    this.ngZone.runOutsideAngular(() => {
      fromEvent(window, 'scroll').subscribe(() => {
        const shouldShow = window.pageYOffset > 50;

        if (this.shouldDisplayButton() !== shouldShow) {
          this.shouldDisplayButton.set(shouldShow);
        }
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
