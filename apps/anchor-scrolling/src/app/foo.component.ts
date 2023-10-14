import { Component } from '@angular/core';
import { NavButtonComponent } from './nav-button.component';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [NavButtonComponent, RouterLink],
  selector: 'app-foo',
  styles: [
    `
      nav-button {
        box-shadow: inset 0 1px 0 0 #ffffff;
        background: #ffffff linear-gradient(to bottom, #ffffff 5%, #f6f6f6 100%);
        border-radius: 6px;
        border: 1px solid #dcdcdc;
        display: inline-block;
        cursor: pointer;
        color: #666666;
        font-family: Arial, sans-serif;
        font-size: 15px;
        font-weight: bold;
        padding: 6px 24px;
        text-decoration: none;
        text-shadow: 0 1px 0 #ffffff;
        outline: 0;
      }
    `,
  ],
  template: `
    Welcome to foo page
    <nav-button routerLink="/home" class="fixed top-4 left-1/2"
      >Home Page</nav-button
    >
    <div class="h-screen bg-blue-200">section 1</div>
    <div class="h-screen bg-red-200">section 2</div>
  `,
})
export class FooComponent {}
