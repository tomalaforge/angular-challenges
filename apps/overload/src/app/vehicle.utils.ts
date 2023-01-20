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
export function createVehicle(
  type: 'boat',
  capacity: number,
  isPublicTransport: boolean
): Boat;
export function createVehicle(type: 'bus', capacity: number): Bus;

export function createVehicle(
  type: VehicleType,
  fuelOrCapacity?: Fuel | number,
  isPublicTransport?: boolean
): Vehicle {
  switch (type) {
    case 'bicycle':
      return { type };
    case 'car':
    case 'moto':
      if (!fuelOrCapacity || !isFuel(fuelOrCapacity))
        throw new Error(`fuel property is missing for type ${type}`);
      return { fuel: fuelOrCapacity, type };
    case 'boat':
      if (!fuelOrCapacity || isFuel(fuelOrCapacity))
        throw new Error(`capacity property is missing for type boat`);
      return { capacity: fuelOrCapacity, type };
    case 'bus':
      if (!fuelOrCapacity || isFuel(fuelOrCapacity))
        throw new Error(`capacity property is missing for type bus`);
      if (!isPublicTransport)
        throw new Error(`isPublicTransport property is missing for type bus`);
      return { capacity: fuelOrCapacity, isPublicTransport, type };
  }
}

const isFuel = (fuel: Fuel | number): fuel is Fuel => typeof fuel !== 'number';
