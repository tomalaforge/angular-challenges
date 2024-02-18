export enum CategoryType {
  Youth = 'Youth',
  Junior = 'Junior',
  Open = 'Open',
  Senior = 'Senior',
}

export class Category {
  static ageToCategory(age: number): CategoryType {
    if (age < 10) return CategoryType.Youth;
    else if (age < 18) return CategoryType.Junior;
    else if (age < 35) return CategoryType.Open;
    return CategoryType.Senior;
  }
}
