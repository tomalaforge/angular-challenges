import { Component, signal } from '@angular/core';
import { SliderComponent } from './slider.component';

@Component({
  standalone: true,
  imports: [SliderComponent],
  selector: 'app-root',
  template: `
    <h2>Slider 1: {{ slider1Value() }}</h2>
    <app-slider
      [step]="3"
      [minValue]="10"
      [maxValue]="30"
      (valueChange)="slider1Value.set($event)" />
    <h2>Slider 2: {{ slider2Value() }}</h2>
    <app-slider
      [step]="10"
      [maxValue]="1000"
      (valueChange)="slider2Value.set($event)" />
  `,
  styles: [''],
})
export class AppComponent {
  slider1Value = signal(0);
  slider2Value = signal(0);
}
