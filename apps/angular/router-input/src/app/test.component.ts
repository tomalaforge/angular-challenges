import { AsyncPipe } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <div>TestId: {{ testId() }}</div>
    <div>Permission: {{ permission() }}</div>
    <div>User: {{ user() }}</div>
  `,
})
export default class TestComponent {
  readonly user = input<string>();
  readonly testId = input<string>();
  readonly permission = input<string>();
}
