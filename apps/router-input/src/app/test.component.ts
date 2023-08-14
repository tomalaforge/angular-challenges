import { AsyncPipe } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
@Component({
  selector: 'app-test',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <div>TestId: {{ testId }}</div>
    <div>Permission: {{ permission }}</div>
    <div>User: {{ user }}</div>
  `,
})
export default class TestComponent {
  private activatedRoute = inject(ActivatedRoute);

  @Input() testId!: string;
  @Input() permission!: string;
  @Input() user!: string;
}
