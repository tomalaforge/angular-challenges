import { AsyncPipe } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-subscription',
  imports: [AsyncPipe],
  template: `
    <div>TestId: {{ testId() }}</div>
    <div>Permission: {{ permission() }}</div>
    <div>User: {{ user() }}</div>
  `,
})
export default class TestComponent {
  testId = input<string>('');
  permission = input<string>('');
  user = input<string>('');
}
