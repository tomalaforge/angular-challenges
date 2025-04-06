import { Component } from '@angular/core';
import { createVehicle } from './vehicle.utils';

@Component({
  standalone: true,
  selector: 'app-root',
  template: ``,
})
export class AppComponent {
  bicycle = createVehicle('bicycle');

  car = createVehicle('car', 'diesel');
  moto = createVehicle('moto', 'diesel');

  boat = createVehicle('boat', 300);

  bus = createVehicle('bus', 20, true);
}
