import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavButtonComponent } from './nav-button.component';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [NavButtonComponent, RouterLink],
  selector: 'app-home',
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
    <nav-button routerLink="/foo" class="fixed top-3 left-1/2"
      >Foo Page</nav-button
    >
    <div #top id="top" class="h-screen bg-gray-500">
      Empty
      <nav-button (click)="scrollBottom()">Scroll Bottom</nav-button>
    </div>
    <div #bottom id="bottom" class="h-screen bg-blue-300">
      I want to scroll each
      <nav-button (click)="scrollTop()">Scroll Top</nav-button>
    </div>
  `,
})
export class HomeComponent {
  @ViewChild('top')
  top!: ElementRef;
  @ViewChild('bottom')
  bottom!: ElementRef;
  scrollTop() {
    this.top.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
  scrollBottom() {
    this.bottom.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}
