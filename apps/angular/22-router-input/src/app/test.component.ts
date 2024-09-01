import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <div>TestId: {{ testId$ | async }}</div>
    <div>Permission: {{ permission$ | async }}</div>
    <div>User: {{ user$ | async }}</div>
  `,
})
export default class TestComponent {

  @Input() testId$!: Observable<string>;
  @Input() permission$!: Observable<string>;
  @Input() user$!: Observable<string>;
}
