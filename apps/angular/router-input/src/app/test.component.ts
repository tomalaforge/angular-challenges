import { AsyncPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <div>TestId: {{ testId }}</div>
    <div>Permission: {{ permission }}</div>
    <div>User: {{ user }}</div>
  `,
})
export default class TestComponent {
  @Input() testId!: string;
  @Input() permission!: string;
  @Input() user!: string;
}
