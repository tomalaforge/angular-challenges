import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-foo',
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    Foo Component
  `,
})
export class FooComponent {}
