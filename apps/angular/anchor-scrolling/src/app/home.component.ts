import { ViewportScroller } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavButtonComponent } from './nav-button.component';

@Component({
  standalone: true,
  imports: [NavButtonComponent, RouterLink],
  selector: 'app-home',
  template: `
    <nav-button [routerLink]="'/foo'" class="fixed left-1/2 top-3">
      Foo Page
    </nav-button>
    <div id="top" class="h-screen bg-gray-500">
      Empty
      <nav-button (click)="goDown()">Scroll Bottom</nav-button>
    </div>
    <div id="bottom" class="h-screen bg-blue-300">
      I want to scroll each
      <nav-button (click)="goUP()">Scroll Top</nav-button>
    </div>
  `,
})
export class HomeComponent {
  scroller = inject(ViewportScroller);

  goUP() {
    //put id value of scrolling section into scrollToAnchor() method as a parameter
    this.scroller.scrollToAnchor('top');
  }

  goDown() {
    //put id value of scrolling section into scrollToAnchor() method as a parameter
    this.scroller.scrollToAnchor('bottom');
  }
}
