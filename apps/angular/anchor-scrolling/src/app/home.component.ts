import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavButtonComponent } from './nav-button.component';

@Component({
  standalone: true,
  imports: [NavButtonComponent, RouterModule],
  selector: 'app-home',
  template: `
    <nav-button [routerLink]="'/foo'" class="fixed left-1/2 top-3">
      Foo Page
    </nav-button>
    <div id="top" class="h-screen bg-gray-500" (click)="scrollTo('bottom')">
      Empty
      <nav-button>Scroll Bottom</nav-button>
    </div>
    <div id="bottom" class="h-screen bg-blue-300" (click)="scrollTo('top')">
      I want to scroll each
      <nav-button>Scroll Top</nav-button>
    </div>
  `,
})
export class HomeComponent {
  scrollTo(anchor: string) {
    const element = document.getElementById(anchor);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
``;
