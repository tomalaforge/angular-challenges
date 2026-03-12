import { signal } from '@angular/core';
import { required, SchemaPathTree } from '@angular/forms/signals';

export type AccountData = {
  firstName: string;
  lastName: string;
};

export const createAccountModel = () => {
  return signal<AccountData>({
    firstName: '',
    lastName: '',
  });
};

export const buildAccountSection = (
  schemaPath: SchemaPathTree<AccountData>,
) => {
  required(schemaPath.firstName, { message: 'First name is required' });
  required(schemaPath.lastName, { message: 'Last name is required' });
};
