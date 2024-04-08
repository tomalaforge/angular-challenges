import { AsyncPipe } from '@angular/common';
import { Component, Input as RouterInput } from '@angular/core';
// import { input} from '@angular/core';
// import { inject } from '@angular/core';
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
  // Old solution with activatedRoute
  // private activatedRoute = inject(ActivatedRoute);
  // testId$ = this.activatedRoute.params.pipe(map((p) => p['testId']));
  // permission$ = this.activatedRoute.data.pipe(map((d) => d['permission']));
  // user$ = this.activatedRoute.queryParams.pipe(map((q) => q['user']));

  // new solution with new input signal
  // with new input signal these below signal variables should be written with braces like that in the html template: <div>TestId: {{ testId() }}</div>
  // testId = input<string>();
  // permission = input<string>();
  // user = input<string>()

  @RouterInput() testId!: string;
  @RouterInput() permission!: string;
  @RouterInput() user!: string;
}
