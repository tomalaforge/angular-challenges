import { NgTemplateOutlet } from '@angular/common';
import { NgModule } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';
import { CardItemDirective } from './card-item.directive';
import { CardComponent } from './card.component';

@NgModule({
  imports: [NgTemplateOutlet, ListItemComponent],
  declarations: [CardItemDirective, CardComponent],
  exports: [CardItemDirective, CardComponent],
})
export class CardModule {}
