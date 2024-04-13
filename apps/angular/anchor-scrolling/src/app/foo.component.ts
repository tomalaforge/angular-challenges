import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavButtonComponent } from './nav-button.component';

@Component({
  standalone: true,
  imports: [NavButtonComponent, RouterModule],
  selector: 'app-foo',
  template: `
    Welcome to foo page
    <nav-button [routerLink]="'home'" class="fixed left-1/2 top-3">
      Home Page
    </nav-button>
    <div
      id="section1"
      class="h-screen bg-blue-200"
      (click)="scrollTo('section2')">
      section 1
      <button class="m-2 block w-fit rounded-md border border-red-500 p-4">
        Section 2
      </button>
    </div>
    <div
      id="section2"
      class="h-screen bg-red-200"
      (click)="scrollTo('section1')">
      section 2
      <button class="m-2 block w-fit rounded-md border border-red-500 p-4">
        Section 1
      </button>
    </div>
  `,
})
export class FooComponent {
  scrollTo(anchor: string) {
    const element = document.getElementById(anchor);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
