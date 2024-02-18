import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavButtonComponent } from './nav-button.component';

@Component({
  standalone: true,
  imports: [NavButtonComponent, RouterLink],
  selector: 'app-foo',
  template: `
    Welcome to foo page
    <nav-button routerLink="/home" class="fixed left-1/2 top-3">
      Home Page
    </nav-button>
    <div class="h-screen bg-blue-200" id="top">
      section 1
      <nav-button [href]="'/foo'" section="bottom">Scroll Bottom</nav-button>
    </div>
    <div class="h-screen bg-red-200" id="bottom">
      section 2
      <nav-button [href]="'/foo'" section="top">Scroll Top</nav-button>
    </div>
  `,
})
export class FooComponent {}
