type VehicleType = 'bus' | 'car' | 'moto' | 'bicycle' | 'boat';
type Fuel = 'diesel' | 'petrol' | 'electric';

interface Bicycle {
  type: 'bicycle';
}

interface Car {
  fuel: Fuel;
  type: 'car';
}

interface Moto {
  fuel: Fuel;
  type: 'moto';
}

interface Bus {
  capacity: number;
  isPublicTransport: boolean;
  type: 'bus';
}

interface Boat {
  capacity: number;
  type: 'boat';
}

type Vehicle = Bicycle | Car | Moto | Bus | Boat;

export function createVehicle(type: 'bicycle'): Bicycle;
export function createVehicle(type: 'car', fuel: Fuel): Car;
export function createVehicle(type: 'moto', fuel: Fuel): Moto;
export function createVehicle(type: 'boat', capacity: number): Boat;
export function createVehicle(
  type: 'bus',
  capacity: number,
  isPublicTransport: boolean,
): Bus;
export function createVehicle(
  type: VehicleType,
  fuelOrCapacity?: Fuel | number,
  isPublicTransport?: boolean,
): Vehicle {
  switch (type) {
    case 'bicycle':
      return { type };

    case 'car':
    case 'moto':
      if (!isFuel(fuelOrCapacity)) {
        throw new Error(`'fuel' must be provided for type "${type}".`);
      }
      return { fuel: fuelOrCapacity, type };

    case 'boat':
      if (typeof fuelOrCapacity !== 'number') {
        throw new Error(`'capacity' must be a number for type "boat".`);
      }
      return { capacity: fuelOrCapacity, type };

    case 'bus':
      if (typeof fuelOrCapacity !== 'number') {
        throw new Error(`'capacity' must be a number for type "bus".`);
      }
      if (typeof isPublicTransport !== 'boolean') {
        throw new Error(
          `'isPublicTransport' must be a boolean for type "bus".`,
        );
      }
      return {
        capacity: fuelOrCapacity,
        isPublicTransport,
        type,
      };
  }
}

function isFuel(value: unknown): value is Fuel {
  return (
    typeof value === 'string' &&
    ['diesel', 'petrol', 'electric'].includes(value)
  );
}
