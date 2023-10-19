import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { CardType } from '../../model/card.model';
import { CardComponent } from '../../ui/card/card.component';
import { CityStore } from '../../data-access/city.store';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  templateUrl: './city-card.component.html',
  standalone: true,
  imports: [CardComponent, ListItemComponent],
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];
  cardType = CardType.CITY;

  constructor(private http: FakeHttpService, private store: CityStore) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
    this.store.cities$.subscribe((c) => (this.cities = c));
  }

  onCreate() {
    this.store.addOne(randomCity());
  }

  onDelete(id: number) {
    this.store.deleteOne(id);
  }
}
