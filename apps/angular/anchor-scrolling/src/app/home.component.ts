import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavButtonComponent } from './nav-button.component';
import { ScrollService } from './scroll.service';

@Component({
  standalone: true,
  imports: [NavButtonComponent, RouterModule],
  selector: 'app-home',
  template: `
    <app-nav-button [routerLink]="'/foo'" class="fixed left-1/2 top-3">
      Foo Page
    </app-nav-button>
    <div
      id="top"
      class="h-screen bg-gray-500"
      (click)="this.scroll.scrollTo('bottom')">
      Empty
      <app-nav-button>Scroll Bottom</app-nav-button>
    </div>
    <div
      id="bottom"
      class="h-screen bg-blue-300"
      (click)="this.scroll.scrollTo('top')">
      I want to scroll each
      <app-nav-button>Scroll Top</app-nav-button>
    </div>
  `,
})
export class HomeComponent {
  scroll = inject(ScrollService);
}
