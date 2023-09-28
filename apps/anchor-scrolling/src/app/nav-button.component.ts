import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'nav-button',
  standalone: true,
  imports: [RouterModule],
  template: `
    <a [routerLink]="['/', href]" (click)="scrollTo(anchor)">
      <ng-content></ng-content>
    </a>
  `,
  host: {
    class: 'block w-fit border border-red-500 rounded-md p-4 m-2',
  },
})
export class NavButtonComponent {
  @Input() href = '';
  @Input() anchor?: string | undefined;

  scrollTo(anchor: string | undefined) {
    if (anchor) {
      const element = document.getElementById(anchor);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }
}

// import { Component, Input } from '@angular/core';
// @Component({
//   selector: 'nav-button',
//   standalone: true,
//   template: `
//     <a [routerLink]="['/', href]" fragment="{{ anchor }}">
//       <ng-content></ng-content>
//     </a>
//   `,
//   host: {
//     class: 'block w-fit border border-red-500 rounded-md p-4 m-2',
//   },
// })
// export class NavButtonComponent {
//   @Input() href = '';
//   @Input() anchor?: string | undefined;
// }
