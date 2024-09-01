import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavButtonComponent } from './nav-button.component';

@Component({
  standalone: true,
  imports: [NavButtonComponent],
  selector: 'app-home',
  template: `
    <nav-button [routerLink]="['/foo']" class="fixed left-1/2 top-3">Foo Page</nav-button>
    <div #topSection id="top" class="h-screen bg-gray-500">
      Empty
      <nav-button (click)="scrollTo('bottomSection')">Scroll Bottom</nav-button>
    </div>
    <div  #bottomSection id="bottom" class="h-screen bg-blue-300">
      I want to scroll each
      <nav-button (click)="scrollTo('topSection')">Scroll Top</nav-button>
    </div>
  `,
})
export class HomeComponent {
    // Using ViewChild to reference DOM elements
    @ViewChild('topSection') topSection!: ElementRef;
    @ViewChild('bottomSection') bottomSection!: ElementRef;

    scrollTo(section: 'topSection' | 'bottomSection') {
      const targetElement = this[section].nativeElement;
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }

}
