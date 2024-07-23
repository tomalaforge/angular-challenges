import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { CityStore } from './../../data-access/city.store';
import { City } from './../../model/city.model';
@Component({
  selector: 'app-city-card',
  templateUrl: './city-card.component.html',
  standalone: true,
  imports: [CardComponent, ListItemComponent],
  styleUrl: './city-card.component.css',
})
export class CityCardComponent implements OnInit {
  cityList: City[] = [];
  addCityCallback = () => {
    this.store.addOne(randomCity());
  };

  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((r) => this.store.addAll(r));
    this.store.cities$.subscribe((response) => {
      this.cityList = response;
    });
  }

  deleteCity(id: number) {
    this.store.deleteOne(id);
  }
}
