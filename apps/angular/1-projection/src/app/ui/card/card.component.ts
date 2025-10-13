import { NgTemplateOutlet } from '@angular/common';
import { Component, input } from '@angular/core';
import { CardType } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">
      <img
        [src]="getImageByType()"
        [alt]="type()"
        class="h-32 w-full rounded-md object-cover" />
      <section>
        <!-- On crée le template ici -->
        <ng-template #cardTemplate let-item>
          <app-list-item
            [name]="getDisplayName(item)"
            [id]="item.id"
            [type]="type()"></app-list-item>
        </ng-template>
        <!-- On assigne le template aux éléments de la liste -->
        @for (item of list(); track item.id) {
          <ng-container
            *ngTemplateOutlet="
              cardTemplate;
              context: { $implicit: item }
            "></ng-container>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </div>
  `,
  imports: [ListItemComponent, NgTemplateOutlet],
})
export class CardComponent {
  readonly list = input<any[] | null>(null);
  readonly type = input.required<CardType>();
  readonly customClass = input('');
  readonly onAdd = input.required<() => void>();

  private readonly imageMap: Record<CardType, string> = {
    [CardType.CITY]: 'assets/img/city.png',
    [CardType.TEACHER]: 'assets/img/teacher.png',
    [CardType.STUDENT]: 'assets/img/student.webp',
  };

  getImageByType(): string {
    return this.imageMap[this.type()] ?? 'assets/default.png';
  }

  addNewItem() {
    this.onAdd()();
  }

  getDisplayName(item: any): string {
    // Pour les villes : utilise 'name'
    // Pour teachers/students : utilise 'firstName'
    return item.name ?? item.firstName ?? 'Unknown';
  }
}
