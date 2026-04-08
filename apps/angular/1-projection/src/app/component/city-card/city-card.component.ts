import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { CardType } from '../../model/card.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card [list]="cities()" [type]="cardType" />
  `,
  imports: [CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent {
  private httpService = inject(FakeHttpService);

  private store = inject(CityStore);

  cities = this.store.cities;
  cardType = CardType.CITY;

  ngOnInit() {
    this.httpService.fetchCities$.subscribe((c) => this.store.addAll(c));
  }

  // console.log(c,cities())
}
