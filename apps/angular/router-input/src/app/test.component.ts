import { AsyncPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <div>TestId: {{ _testId }}</div>
    <div>Permission: {{ _permission }}</div>
    <div>User: {{ _user }}</div>
  `,
})
export default class TestComponent {
  _testId?: string;
  _permission?: string;
  _user?: string;
  @Input() set testId(value: string) {
    this._testId = value;
  }
  @Input() set permission(value: string) {
    this._permission = value;
  }
  @Input() set user(value: string) {
    this._user = value;
  }
}
