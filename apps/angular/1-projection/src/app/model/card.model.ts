export enum CardType {
  TEACHER,
  STUDENT,
  CITY,
}

export interface CardItem {
  label(): string
}
