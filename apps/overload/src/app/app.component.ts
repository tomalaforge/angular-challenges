import { Component } from '@angular/core';
import { createVehicle } from './teacher.utils';

@Component({
  standalone: true,
  selector: 'app-root',
  template: ``,
})
export class AppComponent {
  car = createVehicle('car', 'diesel');
  bus = createVehicle('bus', undefined, 20);
  boat = createVehicle('boat', undefined, 300, true);
  bicycle = createVehicle('bicycle');
}
