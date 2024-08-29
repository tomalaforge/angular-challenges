import { Component, inject } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card [items]="cities()" (add)="onAdd()" class="bg-light-red">
      <img src="../../../assets/img/city.png" width="200px" />
      <ng-template #entry let-city>
        <app-list-item (delete)="onDelete(city.id)">
          {{ city.name }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, ListItemComponent],
})
export class CityCardComponent {
  private httpFakeService = inject(FakeHttpService);
  private store = inject(CityStore);
  cities = this.store.cities;

  constructor() {
    this.httpFakeService.fetchCities$.subscribe((t) => this.store.addAll(t));
  }

  onDelete(id: number): void {
    this.store.deleteOne(id);
  }

  onAdd(): void {
    this.store.addOne(randomCity());
  }
}
