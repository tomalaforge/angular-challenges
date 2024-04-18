export enum CardType {
  TEACHER,
  STUDENT,
  CITY,
}

export class CardItem {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly type?: CardType,
  ) {}
}
