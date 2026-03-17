import { email, required } from '@angular/forms/signals';

import { SchemaPathTree } from '@angular/forms/signals';

export type EmailValue = {
  type: string;
  email: string;
};

export const initialEmailValue: EmailValue = {
  type: '',
  email: '',
};

export const emailSchema = (item: SchemaPathTree<EmailValue>) => {
  required(item.type, { message: 'This field is required' });
  required(item.email, { message: 'Email is required' });
  email(item.email, { message: 'Enter a valid email' });
};
