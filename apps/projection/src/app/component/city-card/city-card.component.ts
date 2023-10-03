import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../ui/card/card.component';
import { City } from '../../model/city.model';
import { CityStore } from '../../data-access/city.store';
import { CardType } from '../../model/card.model';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { randomCity } from '../../data-access/fake-http.service';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-city-card',
  template: `<app-card
    [list]="cities"
    [type]="cardType"
    (addEvent)="addItem()"
    customClass="bg-light-green">
    <ng-template #listView let-item>
      <app-list-item (deleteEvent)="deleteItem(item.id)">
        {{ item.name }}
      </app-list-item>
    </ng-template>
  </app-card>`,
  standalone: true,
  imports: [NgFor, CardComponent, ListItemComponent],
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];
  cardType = CardType.CITY;
  constructor(private http: FakeHttpService, private store: CityStore) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => {
      this.store.addAll(c);
    });
    this.store.cities$.subscribe((c) => {
      this.cities = c;
      console.log(this.cities);
    });
  }
  deleteItem(id: number) {
    this.store.deleteOne(id);
  }
  addItem() {
    this.store.addOne(randomCity());
  }
}
