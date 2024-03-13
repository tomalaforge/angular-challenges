import { NgFor, NgIf, NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { CardType } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [ngStyle]="{ 'background-color': customClass }">
      <ng-content select="img"></ng-content>
      <section>
        <div *ngFor="let item of list">
          <app-list-item
            [name]="item.firstName ? item.firstName : item.name"
            [id]="item.id">
            <ng-container
              *ngTemplateOutlet="
                deleteButton;
                context: { $implicit: item.id }
              "></ng-container>
          </app-list-item>
        </div>
      </section>
      <ng-content select="button"></ng-content>
    </div>
  `,
  standalone: true,
  imports: [NgIf, NgFor, ListItemComponent, NgTemplateOutlet, NgStyle],
})
export class CardComponent {
  @Input() list: any[] | null = null;
  @Input() type!: CardType;
  @Input() customClass = '';

  CardType = CardType;

  @ContentChild('deleteButton') deleteButton!: TemplateRef<any>;
}
