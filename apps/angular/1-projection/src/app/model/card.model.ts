export enum CardType {
  TEACHER,
  STUDENT,
  CITY,
}

export interface TemplateContext<TItem extends object> {
  $implicit: TItem;
}
