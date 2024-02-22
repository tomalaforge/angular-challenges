export type CategoryType = 'YOUTH' | 'JUNIOR' | 'OPEN' | 'SENIOR';

export class Category {
  static fromAge(age: number): CategoryType {
    if (age < 10) return 'YOUTH';
    else if (age < 18) return 'JUNIOR';
    else if (age < 35) return 'OPEN';
    return 'SENIOR';
  }
}
