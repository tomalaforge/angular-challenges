import { Component } from '@angular/core';
@Component({
  selector: 'app-bar',
  standalone: true,
  imports: [],
  template: `
    bar-component
  `,
  host: {
    class: 'block h-full bg-green-500',
  },
})
export default class BarComponent {}
