import { CityStore } from './../../data-access/city.store';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CardComponent } from '../../ui/card/card.component';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { CardType } from '../../model/card.model';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
    [list]="cities()"
    [type]="cardType"
    customClass="bg-light-green" />
  `,
  imports: [CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent implements OnInit {

  constructor(
    private cityStore: CityStore,
    private fakeHttpService: FakeHttpService
  ) {}

  cities = this.cityStore.cities;
  cardType = CardType.CITY;

  ngOnInit() {
    this.fakeHttpService.fetchCities$.subscribe(c => this.cityStore.addAll(c));
  }
}
