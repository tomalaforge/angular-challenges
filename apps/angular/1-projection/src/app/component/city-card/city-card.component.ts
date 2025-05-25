import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities()"
      [cardImgSrc]="'assets/img/teacher.png'"
      (delete)="delete($event)"
      (addNewItem)="addNewItem()"
      customClass="bg-light-red">
      <ng-template #nameTemplate let-item>
        <span class="name">{{ item.name }}</span>
      </ng-template>
    </app-card>
  `,
  imports: [CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent {
  private http = inject(FakeHttpService);
  private store = inject(CityStore);

  cities = this.store.cities;

  fetchCities = rxResource<City[], string | undefined>({
    loader: () =>
      this.http.fetchCities$.pipe(tap((city) => this.store.addAll(city))),
  });

  addNewItem() {
    this.store.addOne(randomCity());
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }
}
