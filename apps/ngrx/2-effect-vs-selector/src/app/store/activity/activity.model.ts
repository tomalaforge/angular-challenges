import {
  incrementalNumber,
  rand,
  randFirstName,
  randText,
} from '@ngneat/falso';

export const activityType = [
  'Sport',
  'Sciences',
  'History',
  'Maths',
  'Physics',
] as const;
export type ActivityType = (typeof activityType)[number];

export interface Person {
  id: number;
  name: string;
}

export interface Activity {
  id: number;
  name: string;
  type: ActivityType;
  teacher: Person;
}

const factoryPerson = incrementalNumber();

export const randPerson = () => ({
  id: factoryPerson(),
  name: randFirstName(),
});

const factoryActivity = incrementalNumber();

export const randActivity = (): Activity => ({
  id: factoryActivity(),
  name: randText(),
  type: rand(activityType),
  teacher: randPerson(),
});

export const activities: Activity[] = [
  randActivity(),
  randActivity(),
  randActivity(),
  randActivity(),
  randActivity(),
  randActivity(),
  randActivity(),
  randActivity(),
  randActivity(),
];
