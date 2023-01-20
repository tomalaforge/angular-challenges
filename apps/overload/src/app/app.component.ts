import { Component } from '@angular/core';
import { createVehicle } from './vehicle.utils';

@Component({
  standalone: true,
  selector: 'app-root',
  template: ``,
})
export class AppComponent {
  car = createVehicle('car', 'petrol');
  moto = createVehicle('moto', 'diesel');
  bus = createVehicle('bus', 20);
  boat = createVehicle('boat', 300, true);
  bicycle = createVehicle('bicycle');
}
