import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [],
  template: `
    <div>TestId: {{ testId }}</div>
    <div>Permission: {{ permission }}</div>
    <div>User: {{ user }}</div>
  `,
})
export default class TestComponent {
  // Router Inputs
  @Input() testId: string | undefined;
  @Input() permission: string | undefined;
  @Input() user: string | undefined;
}
