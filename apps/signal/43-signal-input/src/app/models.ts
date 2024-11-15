export type User = {
  name: string;
  lastName?: string;
  age?: number;
  category?: Category;
};

export type Category = 'Youth' | 'Junior' | 'Open' | 'Senior';
