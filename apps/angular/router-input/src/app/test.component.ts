import { AsyncPipe } from '@angular/common';
import { Component, Input as RouterInput } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { map } from 'rxjs';
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
  @RouterInput() testId!: string;
  @RouterInput() permission!: string;
  @RouterInput() user!: string;
  // private activatedRoute = inject(ActivatedRoute);
  // testId$ = this.activatedRoute.params.pipe(map((p) => p['testId']));
  // permission$ = this.activatedRoute.data.pipe(map((d) => d['permission']));
  // user$ = this.activatedRoute.queryParams.pipe(map((q) => q['user']));
}
