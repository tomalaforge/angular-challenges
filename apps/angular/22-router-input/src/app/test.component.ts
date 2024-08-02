import { AsyncPipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <div>TestId: {{ id }}</div>
    <div>Permission: {{ permission  }}</div>
    <div>User: {{ user }}</div>
  `,
})
export default class TestComponent {
  private activatedRoute = inject(ActivatedRoute);
  @Input() id! : string ;
  @Input() user! : string ;
  @Input() permission! : string ;
}
