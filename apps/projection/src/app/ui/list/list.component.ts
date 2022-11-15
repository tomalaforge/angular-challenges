import { Component } from '@angular/core';

@Component({
  selector: 'app-list',
  standalone: true,
  template: `<ng-content></ng-content>`,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
    `,
  ],
})
export class ListComponent {}
