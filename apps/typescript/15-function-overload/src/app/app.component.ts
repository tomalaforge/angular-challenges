import { Component } from '@angular/core';
import { createVehicle } from './vehicle.utils';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="container">
      <h1>Vehicle Types</h1>

      <div class="vehicle-grid">
        <div class="vehicle-card">
          <h2>Car</h2>
          <p>Type: {{ car.type }}</p>
          <p>Fuel: {{ car.fuel }}</p>
        </div>

        <div class="vehicle-card">
          <h2>Motorcycle</h2>
          <p>Type: {{ moto.type }}</p>
          <p>Fuel: {{ moto.fuel }}</p>
        </div>

        <div class="vehicle-card">
          <h2>Bus</h2>
          <p>Type: {{ bus.type }}</p>
          <p>Capacity: {{ bus.capacity }}</p>
          <p>Public Transport: {{ bus.isPublicTransport ? 'Yes' : 'No' }}</p>
        </div>

        <div class="vehicle-card">
          <h2>Boat</h2>
          <p>Type: {{ boat.type }}</p>
          <p>Capacity: {{ boat.capacity }}</p>
        </div>

        <div class="vehicle-card">
          <h2>Bicycle</h2>
          <p>Type: {{ bicycle.type }}</p>
        </div>
      </div>
    </div>
  `,
  styles: `
    .container {
      @apply mx-auto max-w-4xl p-8;
    }

    h1 {
      @apply mb-8 text-center text-3xl font-bold text-gray-800;
    }

    .vehicle-grid {
      @apply grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3;
    }

    .vehicle-card {
      @apply rounded-lg border border-gray-200 bg-white p-6 shadow-md;

      h2 {
        @apply mb-4 text-xl font-semibold text-indigo-600;
      }

      p {
        @apply mb-2 text-gray-600;
      }
    }
  `,
})
export class AppComponent {
  car = createVehicle('car', 'diesel');
  moto = createVehicle('moto', 'diesel');
  bus = createVehicle('bus', undefined, 20, false);
  boat = createVehicle('boat', undefined, 300);
  bicycle = createVehicle('bicycle');
}
