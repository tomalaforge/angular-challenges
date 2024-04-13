import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavButtonComponent } from './nav-button.component';
import { ScrollService } from './scroll.service';

@Component({
  standalone: true,
  imports: [NavButtonComponent, RouterModule],
  selector: 'app-foo',
  template: `
    Welcome to foo page
    <app-nav-button [routerLink]="'home'" class="fixed left-1/2 top-3">
      Home Page
    </app-nav-button>
    <div
      id="section1"
      class="h-screen bg-blue-200"
      (click)="this.scroll.scrollTo('section2')">
      section 1
      <button class="m-2 block w-fit rounded-md border border-red-500 p-4">
        Section 2
      </button>
    </div>
    <div
      id="section2"
      class="h-screen bg-red-200"
      (click)="this.scroll.scrollTo('section1')">
      section 2
      <button class="m-2 block w-fit rounded-md border border-red-500 p-4">
        Section 1
      </button>
    </div>
  `,
})
export class FooComponent {
  scroll = inject(ScrollService);
}
