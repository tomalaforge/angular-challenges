export type Role = 'MANAGER' | 'WRITER' | 'READER' | 'CLIENT';

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
  roles: ['MANAGER'],
};

export const writer: User = {
  name: 'writer',
  isAdmin: false,
  roles: ['WRITER'],
};

export const reader: User = {
  name: 'reader',
  isAdmin: false,
  roles: ['READER'],
};

export const readerAndWriter: User = {
  name: 'reader',
  isAdmin: false,
  roles: ['READER', 'WRITER'],
};

export const client: User = {
  name: 'client',
  isAdmin: false,
  roles: ['CLIENT'],
};

export const everyone: User = {
  name: 'client',
  isAdmin: false,
  roles: [],
};
