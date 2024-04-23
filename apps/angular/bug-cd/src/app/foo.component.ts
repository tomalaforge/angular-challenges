import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({
  selector: 'app-foo',
  standalone: true,
  template: `
    Foo Component
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooComponent {}
