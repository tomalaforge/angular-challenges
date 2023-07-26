import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { CardComponent } from '../../ui/card/card.component';
import { City } from '../../model/city.model';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';

@Component({
  selector: 'app-city-card',
  template: `<app-card
    [list]="cities"
    [addOneStore]="store.addOne.bind(store)"
    [removeStore]="store.deleteOne.bind(store)"
    [addRandom]="addRandom"
    customClass="bg-light-orange"
    label="name"></app-card>`,
  styles: [
    `
      .bg-light-orange {
        background-color: rgba(250, 100, 0, 0.1);
      }
      .bg-light-orange > .imgHolder {
        content: url('./../../../assets/img/city.jpg');
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CardComponent],
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];

  http: FakeHttpService = inject(FakeHttpService);
  store: CityStore = inject(CityStore);
  addRandom: () => City = randomCity;

  ngOnInit(): void {
    this.store.deleteOne;
    this.http.fetchCities$.subscribe((c) => {
      this.store.addAll(c);
      this.store.citys$.subscribe((c) => {
        console.log(c);
        this.cities = c;
      });
    });
  }
}
