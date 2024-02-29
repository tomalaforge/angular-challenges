import { Component, OnInit, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap, tap } from 'rxjs';
import { CityStore } from '../../data-access/city.store';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { CardType } from '../../model/card.model';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card [list]="cities()" [type]="cardType" customClass="bg-light-green">
      <img src="assets/img/city.png" width="200px" />
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent],
})
export class CityCardComponent implements OnInit {
  cities: WritableSignal<City[]> = <WritableSignal<City[]>>toSignal(
    this.http.fetchCities$.pipe(
      tap((c) => this.store.addAll(c)),
      switchMap(() => this.store.cities$),
    ),
  );

  cardType = CardType.CITY;

  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit(): void {}
}
