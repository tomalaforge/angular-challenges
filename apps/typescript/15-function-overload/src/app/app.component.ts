import { Component } from '@angular/core';
import { createVehicle } from './vehicle.utils';

@Component({
  selector: 'app-root',
  template: ``,
})
export class AppComponent {
  car = createVehicle('car', 'diesel');
  moto = createVehicle('moto', 'diesel');
  bus = createVehicle('bus', undefined, 20);
  boat = createVehicle('boat', undefined, 300, true);
  bicycle = createVehicle('bicycle');
}
