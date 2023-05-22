import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
@Component({
  selector: 'app-test',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <div>TestId: {{ testId$ | async }}</div>
    <div>Permission: {{ permission$ | async }}</div>
    <div>User: {{ user$ | async }}</div>
  `,
})
export default class TestComponent {
  private activatedRoute = inject(ActivatedRoute);

  testId$ = this.activatedRoute.params.pipe(map((p) => p['testId']));
  permission$ = this.activatedRoute.data.pipe(map((d) => d['permission']));
  user$ = this.activatedRoute.queryParams.pipe(map((q) => q['user']));
}
