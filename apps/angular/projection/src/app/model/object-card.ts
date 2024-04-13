import { CardType } from './card.model';

export interface ObjectCard<T> {
  addObject(): void;
  cardType: CardType;
  iconPath: string;
  backGroundColor: string;
  objectsList: T[];
}
