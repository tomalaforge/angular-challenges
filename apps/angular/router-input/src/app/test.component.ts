import { Component, input } from '@angular/core';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [],
  template: `
    <div>TestId: {{ testId() }}</div>
    <div>Permission: {{ permission() }}</div>
    <div>User: {{ user() }}</div>
  `,
})
export default class TestComponent {
  testId = input.required();
  permission = input.required();
  user = input.required();
}
