export type ContactModel = {
  firstname: string;
  lastname: string;
  relation: string;
  email: string;
};

export type EmailModel = {
  type: string;
  email: string;
};

export type RegistrationModel = {
  name: string;
  pseudo: string;
  contacts: ContactModel[];
  emails: EmailModel[];
};
