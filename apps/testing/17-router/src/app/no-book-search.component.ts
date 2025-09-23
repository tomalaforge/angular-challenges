import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `
    <div>No book found for this search</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ShelfComponent {}
