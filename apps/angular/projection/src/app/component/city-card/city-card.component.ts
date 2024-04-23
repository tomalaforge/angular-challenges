import { Component, OnInit, inject } from '@angular/core';
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
      customClass="bg-light-blue"
      (addNewItem)="store.addOne(randomCity())"
      (itemDelete)="store.deleteOne($event)">
      <img src="assets/img/city.png" width="200px" />
    </app-card>
  `,
  standalone: true,

  imports: [CardComponent],
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];
  randomCity = randomCity;

  private http = inject(FakeHttpService);
  protected store = inject(CityStore);

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((s) => {
      console.log(s);
      this.store.addAll(s);
    });

    this.store.cities$.subscribe((s) => (this.cities = s));
  }
}
