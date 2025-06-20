import { CityStore } from './../../data-access/city.store';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CardComponent } from '../../ui/card/card.component';
import { FakeHttpService, randomCity } from '../../data-access/fake-http.service';
import { CardType } from '../../model/card.model';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
    [store]="cityStore"
    customClass="bg-light-green">
      <img src="assets/img/city.png" ngProjectAs="card-header" width="200" height="200" />

      <button
        ngProjectAs="card-footer"
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </app-card>
  `,
  imports: [CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent implements OnInit {

  constructor(
    protected cityStore: CityStore,
    private fakeHttpService: FakeHttpService
  ) {}

  cardType = CardType.CITY;

  ngOnInit() {
    this.fakeHttpService.fetchCities$.subscribe(c => this.cityStore.addAll(c));
  }

  addNewItem() {
    this.cityStore.addOne(randomCity());
  }
}
