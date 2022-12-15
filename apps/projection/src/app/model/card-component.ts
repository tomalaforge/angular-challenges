import { TemplateRef } from '@angular/core';

export interface ICardComponent {
  cardTemplate: TemplateRef<any>;
  addNewItem: () => void;
  deleteItem: (id: number) => void;
}
