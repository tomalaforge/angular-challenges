import { Component, OnInit, inject, signal } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { templateRefDirective } from '../../directives/tempateRef.directive';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card [list]="cities()" (addItem)="addCity()" class="bg-light-green">
      <img src="assets/img/city.png" width="200px" />
      <ng-template templateRef let-city>
        <app-list-item [id]="city.id" (deleteItem)="deleteCity(city.id)">
          {{ city.name }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, ListItemComponent, templateRefDirective],
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
})
export class CityCardComponent implements OnInit {
  cities = signal<City[]>([]);

  http = inject(FakeHttpService);
  storeCity = inject(CityStore);

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((cities) => this.storeCity.addAll(cities));

    this.storeCity.cities$.subscribe((cities) => this.cities.set(cities));
  }

  addCity() {
    this.storeCity.addOne(randomCity());
  }

  deleteCity(cityId: number) {
    this.storeCity.deleteOne(cityId);
  }
}
