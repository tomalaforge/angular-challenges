export enum CardType {
  TEACHER,
  STUDENT,
  CITY,
}

export interface CardModel {
  name: string;
  firstName: string;
  lastName: string;
  subject: string;
  id: number;
}
