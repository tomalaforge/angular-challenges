import { Component } from '@angular/core';
import { NavButtonComponent } from './nav-button.component';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [NavButtonComponent, RouterLink],
  selector: 'app-home',
  template: `
    <a routerLink="/foo"
      ><nav-button class="fixed top-3 left-1/2"> Foo Page </nav-button></a
    >
    <div #top id="top" class="h-screen bg-gray-500">
      Empty
      <div style="cursor: pointer;" (click)="scrollToAnchor(bottom)">
        <nav-button>Scroll Bottom</nav-button>
      </div>
    </div>
    <div #bottom id="bottom" class="h-screen bg-blue-300">
      I want to scroll each
      <div (click)="scrollToAnchor(top)" style="cursor: pointer;">
        <nav-button>Scroll Top</nav-button>
      </div>
    </div>
  `,
})
export class HomeComponent {
  constructor() {}
  scrollToAnchor(anchor: HTMLElement): void {
    anchor.scrollIntoView({ behavior: 'smooth' });
  }
}
