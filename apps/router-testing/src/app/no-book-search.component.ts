import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterLink],
  template: `
    <div>No book found for this search</div>
    <button routerLink="/">Go Back</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ShelfComponent {}
