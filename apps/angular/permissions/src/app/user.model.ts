export type Role = 'MANAGER' | 'WRITER' | 'READER' | 'CLIENT';

export interface User {
  name: string;
  isAdmin: boolean;
  roles: Role[];
}

export interface InfoHasRole {
  rolesInformation: User[];
  UserLogged: User | undefined;
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
export interface RoleWeight {
  name: string;
  route: string;
  weight: number;
}
export const RolesWeight: RoleWeight[] = [
  {
    name: 'enter',
    route: 'enter',
    weight: 0,
  },
  {
    name: 'manager',
    route: 'manager',
    weight: 1,
  },
  {
    name: 'readerandwriter',
    route: 'readerandwriter',
    weight: 2,
  },
  {
    name: 'reader',
    route: 'reader',
    weight: 3,
  },
  {
    name: 'writer',
    route: 'writer',
    weight: 3,
  },
  {
    name: 'client',
    route: 'client',
    weight: 4,
  },
  {
    name: 'everyone',
    route: 'everyone',
    weight: 5,
  },
];
