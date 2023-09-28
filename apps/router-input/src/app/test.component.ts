import { AsyncPipe } from '@angular/common';
import { Component, Input, numberAttribute } from '@angular/core';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <div>@Input() TestId: {{ testId }}</div>
    <div>@Input() Permission: {{ permissionDifferentName }}</div>
    <div>@Input() User: {{ user }}</div>
  `,
})
export default class TestComponent {
  @Input({ transform: numberAttribute }) testId = 0;
  @Input('permission') permissionDifferentName = '';
  @Input() user = '';
}
