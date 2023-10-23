import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-test',
  standalone: true,
  template: `
    <div>TestId: {{ id }}</div>
    <div>Permission: {{ permission }}</div>
    <div>User: {{ user }}</div>
  `,
})
export default class TestComponent {
  @Input('testId') id!: string;
  @Input() user!: string;
  @Input() permission!: string;
}
