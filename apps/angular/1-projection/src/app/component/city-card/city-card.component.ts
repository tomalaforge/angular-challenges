import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
    <app-card [list]="cities()" [itemTemplate]="cityItem" [onAdd]="addCity">
      <p>Titulo para city</p>
      <img ngSrc="assets/img/teacher.png" width="200" height="200" />
    </app-card>

    <!--Template para teacher que se mostrará dentro de app-card -->
    <ng-template #cityItem let-item>
      <app-list-item
        [id]="item.id"
        [name]="item.name"
        (delete)="deleteCity($event)"></app-list-item>
    </ng-template>
  `,
  imports: [CardComponent, ListItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent {
  //Inyectamos el store de cityes
  private store = inject(CityStore);
  private http = inject(FakeHttpService);

  cities = this.store.cities;
  citiesStore = this.store;

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((t) => this.store.addAll(t));
  }

  addCity = () => {
    this.citiesStore.addOne(randomCity());
  };
  deleteCity(id: number) {
    this.citiesStore.deleteOne(id);
  }
}
