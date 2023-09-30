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

// Overloads
export function createVehicle(type: 'bicycle'): Bicycle;
export function createVehicle(type: 'car', fuel: Fuel): Car;
export function createVehicle(type: 'moto', fuel: Fuel): Moto;
export function createVehicle(
  type: 'bus',
  capacity: number,
  isPublicTransport: boolean
): Bus;
export function createVehicle(type: 'boat', capacity: number): Boat;

// Implementation
export function createVehicle(
  type: string,
  fuelOrCapacity?: Fuel | number,
  isPublicTransport?: boolean
): Vehicle {
  switch (type) {
    case 'bicycle':
      return { type };
    case 'car':
    case 'moto':
      if (typeof fuelOrCapacity !== 'string')
        throw new Error(`fuel property is missing for type ${type}`);
      return { type, fuel: fuelOrCapacity };
    case 'boat':
      if (typeof fuelOrCapacity !== 'number')
        throw new Error(`capacity property is missing for type ${type}`);
      return { type, capacity: fuelOrCapacity };
    case 'bus':
      if (
        typeof fuelOrCapacity !== 'number' ||
        typeof isPublicTransport !== 'boolean'
      )
        throw new Error(`Properties are missing for type ${type}`);
      return { type, capacity: fuelOrCapacity, isPublicTransport };
    default:
      throw new Error(`Invalid vehicle type: ${type}`);
  }
}
