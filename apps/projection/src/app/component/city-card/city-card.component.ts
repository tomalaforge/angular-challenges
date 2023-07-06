import { Component, OnInit } from '@angular/core';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { CityStore } from '../../data-access/city.store';
import { Observable } from 'rxjs';
import { City } from '../../model/city.model';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../ui/card/card.component';
import { CardType } from '../../model/card.model';

@Component({
  selector: 'app-city-card',
  template: `<app-card
    [list]="cities$ | async"
    [type]="cardType"
    customClass="bg-light-green"></app-card>`,
  standalone: true,
  styles: [
    `
      ::ng-deep .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CommonModule, CardComponent],
})
export class CityCardComponent implements OnInit {
  cities$!: Observable<City[]>;
  cardType = CardType.CITY;
  constructor(private http: FakeHttpService, private store: CityStore) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((cities) => this.store.addAll(cities));
    this.cities$ = this.store.teachers$;
  }
}
