import { Component, input } from '@angular/core';

@Component({
  selector: 'app-subscription',
  standalone: true,
  template: `
    <div>TestId: {{ testId() }}</div>
    <div>Permission: {{ permission() }}</div>
    <div>User: {{ user() }}</div>
  `,
})
export default class TestComponent {
  readonly testId = input<number>();
  readonly permission = input<string>();
  readonly user = input<string>();
}
