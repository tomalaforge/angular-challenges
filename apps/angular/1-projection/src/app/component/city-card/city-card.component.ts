import { Component, OnInit } from '@angular/core';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { CityStore } from '../../data-access/city.store';
import { CardComponent } from '../../ui/card/card.component';
import { KeyType } from '../../model/key.model';
import { CardType } from '../../model/card.model';
import { City } from '../../model/city.model';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities"
      [type]="cardType"
      [key]="keyType"
      customClass="bg-light-green"></app-card>
  `,
  standalone: true,
  styles: [
    `
      :host .bg-light-green {
        background-color: rgba(0, 0, 250, 0.1);
      }
    `,
  ],
  imports: [CardComponent],
})
export class CityCardComponent implements OnInit {
  cities: City[]=[]
  cardType: CardType.CITY
  keyType: KeyType.name

  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c)=> this.store.addAll(c));

    this.store.cities$.subscribe((c) => (this.cities = c));
  }
}
