import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import { CardComponent } from '../../ui/card/card.component';
import { CardRowDirective } from '../../ui/card/card.directive';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      (addNewItem)="cityStore.addOne()"
      [items]="cityStore.$cities()"
      class="bg-light-purple">
      <img src="assets/img/city.png" width="200px" />
      <ng-template [cardRow]="cityStore.$cities()" let-city>
        <app-list-item (delete)="cityStore.deleteOne(city.id)">
          {{ city.name }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  styles: [
    `
      .bg-light-purple {
        background-color: rgb(35 40 225 / 56%);
      }
    `,
  ],
  imports: [CardComponent, CardRowDirective, ListItemComponent],
  providers: [CityStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent {
  readonly cityStore = inject(CityStore);
}
