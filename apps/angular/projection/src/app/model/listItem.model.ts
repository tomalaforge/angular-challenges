import { CardType } from './card.model';

export interface ListItem {
  id: number;
  name: string;
  type: CardType;
}
