import { signal } from '@angular/core';
import { required, SchemaPathTree } from '@angular/forms/signals';

export type AddressData = {
  street: string;
  zipcode: string;
  city: string;
};

export const createAddressModel = () => {
  return signal<AddressData>({
    street: '',
    zipcode: '',
    city: '',
  });
};

export const buildAddressSection = (
  schemaPath: SchemaPathTree<AddressData>,
) => {
  required(schemaPath.street, { message: 'Street is required' });
  required(schemaPath.zipcode, { message: 'ZIP code is required' });
  required(schemaPath.city, { message: 'City is required' });
};
