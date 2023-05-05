import { Component, Input } from '@angular/core';
@Component({
  selector: 'nav-button',
  standalone: true,
  template: `
    <div>
      <ng-content></ng-content>
    </div>
  `,
  host: {
    class: 'block w-fit border border-red-500 rounded-md p-4 m-2',
  },
})
export class NavButtonComponent {
  @Input() href = '';
}
