import { AsyncPipe } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
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
export default class TestComponent implements OnInit {
  ngOnInit(): void {
    this.activatedRoute.params.pipe(map((p) => p['testId']));
    this.activatedRoute.data.pipe(map((d) => d['permission']));
    this.activatedRoute.queryParams.pipe(map((q) => q['user']));
  }
  private activatedRoute = inject(ActivatedRoute);
  @Input() testId!: number;
  @Input()
  permission!: string;
  @Input() user!: string;
}
