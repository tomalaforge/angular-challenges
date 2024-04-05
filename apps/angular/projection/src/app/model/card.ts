// export enum CardType {
//   TEACHER,
//   STUDENT,
//   CITY,
// }

export interface Card {
  addOne: () => void;
  removeOne: (id: number) => void;
}
