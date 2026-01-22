import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
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
    <app-card
      [list]="cities()"
      [templateType]="city"
      (itemAdded)="onCityAdded()"
      customClass="bg-light-blue">
      <img
        ngSrc="assets/img/city.png"
        width="200"
        height="200"
        ngProjectAs="card-image" />
    </app-card>

    <ng-template #city let-item>
      <app-list-item
        [name]="item.name"
        [id]="item.id"
        (deleted)="onCityDeleted($event)" />
    </ng-template>
  `,
  imports: [CardComponent, ListItemComponent, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(CityStore);

  cities = this.store.cities.asReadonly();

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
  }

  onCityAdded() {
    this.store.addOne(randomCity());
  }

  onCityDeleted(id: number) {
    this.store.deleteOne(id);
  }
}
