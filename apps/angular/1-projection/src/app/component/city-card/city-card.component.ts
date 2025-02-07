import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardType } from '../../model/card.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card [list]="cities()" [type]="cardType" customClass="city-card">
      <!-- Header Template -->
      <div cardHeader class="header-content">
        <img
          ngSrc="assets/img/city.png"
          width="200"
          height="200"
          alt="City"
          class="header-image" />
      </div>

      <!-- Item Template -->
      <ng-template #itemTemplate let-city>
        <app-list-item
          [name]="city.name"
          [id]="city.id"
          [type]="cardType"
          (delete)="deleteCity(city.id)"></app-list-item>
      </ng-template>

      <!-- Footer Template -->
      <div cardFooter>
        <button class="add-button" (click)="addCity()">Add City</button>
      </div>
    </app-card>
  `,
  styles: [
    `
      .city-card {
        @apply bg-gradient-to-br from-blue-50 to-white;
      }
      .header-content {
        @apply flex justify-center;
      }
      .header-image {
        @apply rounded-lg object-cover shadow-sm;
      }
      .add-button {
        @apply w-full rounded-md bg-blue-500 px-4 py-2 text-white;
        @apply transition-colors duration-200 hover:bg-blue-600;
        @apply disabled:cursor-not-allowed disabled:opacity-50;
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent, NgOptimizedImage],
  standalone: true,
})
export class CityCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(CityStore);

  cities = this.store.cities;
  cardType = CardType.CITY;

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
  }

  addCity() {
    this.store.addOne(randomCity());
  }

  deleteCity(id: number) {
    this.store.deleteOne(id);
  }
}
