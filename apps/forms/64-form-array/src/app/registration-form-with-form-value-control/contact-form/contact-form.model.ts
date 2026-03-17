import { email, required, SchemaPathTree } from '@angular/forms/signals';

export type ContactValue = {
  firstname: string;
  lastname: string;
  relation: string;
  email: string;
};

export const initialContactValue: ContactValue = {
  firstname: '',
  lastname: '',
  relation: '',
  email: '',
};

export const contactSchema = (item: SchemaPathTree<ContactValue>) => {
  required(item.firstname, { message: 'This field is required' });
  required(item.lastname, { message: 'This field is required' });
  required(item.relation, { message: 'This field is required' });
  required(item.email, { message: 'Email is required' });
  email(item.email, { message: 'Enter a valid email' });
};
