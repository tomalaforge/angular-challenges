import { Component, input } from '@angular/core';

@Component({
  selector: 'app-subscription',
  template: `
    <div>TestId: {{ testId() }}</div>
    <div>Permission: {{ permission() }}</div>
    <div>User: {{ user() }}</div>
  `,
})
export default class TestComponent {
  testId = input('testId');
  permission = input('permission');
  user = input('user');
}
