import { AsyncPipe } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
  private activatedRoute = inject(ActivatedRoute);

  @Input() testId!: string;
  @Input() permission!: string;
  @Input() user!: string;

  // testId$ = this.activatedRoute.params.pipe(map((p) => p['testId']));
  // permission$ = this.activatedRoute.data.pipe(map((d) => d['permission']));
  // user$ = this.activatedRoute.queryParams.pipe(map((q) => q['user']));
}
