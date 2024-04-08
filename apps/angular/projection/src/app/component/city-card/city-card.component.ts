import { Component, OnInit } from '@angular/core';
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
      [list]="cities"
      [deleteItem]="deleteItem"
      [addNewItem]="addNewItem"
      [getName]="getName"
      customClass="bg-light-blue">
      <ng-container ngProjectAs="[image]">
        <img src="assets/img/city.png" width="200px" />
      </ng-container>
    </app-card>
  `,
  standalone: true,
  styles: [
    `
      :host ::ng-deep .bg-light-blue {
        background-color: rgba(0, 0, 250, 0.1);
      }
    `,
  ],
  imports: [CardComponent],
})
export class CityCardComponent implements OnInit {
  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}
  cities: City[] = [];

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((t) => this.store.addAll(t));

    this.store.cities$.subscribe((t) => (this.cities = t));
  }

  deleteItem = (id: number) => {
    this.store.deleteOne(id);
  };

  addNewItem = () => {
    this.store.addOne(randomCity());
  };

  getName = (city: City) => city.name;
}
