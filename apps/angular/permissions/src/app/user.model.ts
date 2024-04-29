export enum Role {
  MANAGER = 'MANAGER',
  WRITER = 'WRITER',
  READER = 'READER',
  CLIENT = 'CLIENT',
}

export interface User {
  name: string;
  isAdmin: boolean;
  roles: Role[];
}

export const admin: User = {
  name: 'admin',
  isAdmin: true,
  roles: [],
};

export const manager: User = {
  name: 'manager',
  isAdmin: false,
  roles: [Role.MANAGER],
};

export const writer: User = {
  name: 'writer',
  isAdmin: false,
  roles: [Role.WRITER],
};

export const reader: User = {
  name: 'reader',
  isAdmin: false,
  roles: [Role.READER],
};

export const readerAndWriter: User = {
  name: 'reader',
  isAdmin: false,
  roles: [Role.READER, Role.WRITER],
};

export const client: User = {
  name: 'client',
  isAdmin: false,
  roles: [Role.CLIENT],
};

export const everyone: User = {
  name: 'client',
  isAdmin: false,
  roles: [],
};
