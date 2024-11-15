import { Category } from './models';

export const ageToCategory = (age: number): Category => {
  if (age < 0 || !Number.isInteger(age)) {
    throw new Error('Age must be a positive integer');
  }

  const categoryRanges: { [key: number]: Category } = {
    10: 'Youth',
    18: 'Junior',
    35: 'Open',
  };

  const threshold = Object.keys(categoryRanges)
    .map(Number)
    .find((limit) => age < limit);

  return threshold ? categoryRanges[threshold] : 'Senior';
};
