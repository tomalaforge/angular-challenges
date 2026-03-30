export interface Contact {
  firstName: string;
  lastname: string;
  relation: string;
  email: string;
}

export interface Email {
  type: string;
  email: string;
}

export interface Registration {
  name: string;
  pseudo: string;
  contacts: Contact[];
  emails: Email[];
}
