import { Component, OnInit } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardType } from '../../model/card.model';
import { City } from '../../model/city.model';
import { ObjectCard } from '../../model/object-card';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="objectsList"
      [deleteService]="store"
      [iconPath]="iconPath"
      [backGroundColor]="backGroundColor"
      (objectAdded)="addObject()"></app-card>
  `,
  standalone: true,
  imports: [CardComponent],
})
export class CityCardComponent implements OnInit, ObjectCard<City> {
  constructor(
    public store: CityStore,
    private http: FakeHttpService,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((s) => this.store.addAll(s));

    this.store.cities$.subscribe((s) => (this.objectsList = s));
  }

  objectsList: City[] = [];
  cardType: CardType = CardType.CITY;
  iconPath = 'assets/img/city.png';
  backGroundColor = 'orange';

  addObject(): void {
    this.store.addOne(randomCity());
  }
}
