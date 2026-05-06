export type AddressModel = {
  street: string;
  zipcode: string;
  city: string;
};

export type CheckoutModel = {
  firstName: string;
  lastName: string;
  shipping: AddressModel;
  billing: AddressModel;
  sameAsShipping: boolean;
};

export const initialCheckoutModel: CheckoutModel = {
  firstName: '',
  lastName: '',
  shipping: {
    street: '',
    zipcode: '',
    city: '',
  },
  billing: {
    street: '',
    zipcode: '',
    city: '',
  },
  sameAsShipping: false,
};
