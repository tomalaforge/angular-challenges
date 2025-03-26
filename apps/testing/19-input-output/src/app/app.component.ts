import { Component } from '@angular/core';
import { CounterComponent } from './counter.component';

@Component({
  imports: [CounterComponent],
  selector: 'app-root',
  template: `
    <app-counter [initialValue]="10" (send)="log($event)" />
  `,
})
export class AppComponent {
  log(counter: number) {
    console.log('output log', counter);
  }
}
