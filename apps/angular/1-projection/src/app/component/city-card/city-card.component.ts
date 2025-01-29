import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import { CardRowDirective } from '../../ui/card/card-row.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card [items]="cities()" (addNewItem)="onNewItemAdded()">
      <img ngSrc="assets/img/student.webp" width="200" height="200" />

      <ng-template [cardRow]="cities()" let-city>
        <app-list-item (delete)="onDelete(city.id)">
          <div>{{ city.name }}</div>
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  imports: [
    CardComponent,
    NgOptimizedImage,
    CardRowDirective,
    ListItemComponent,
  ],
  providers: [CityStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent {
  private store = inject(CityStore);

  cities = this.store.cities;

  onNewItemAdded() {
    this.store.addOne();
  }

  onDelete(id: number) {
    this.store.deleteOne(id);
  }
}
