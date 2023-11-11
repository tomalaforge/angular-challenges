import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CityStore } from '../../data-access/city.store';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';
@Component({
  selector: 'app-city-card',
  template: `
    <ng-container *ngIf="cities$ | async as cities">
      <app-card [store]="store" [getName]="getCityName" [list]="cities">
        <img width="200px" src="/assets/img/city.avif" />
      </app-card>
    </ng-container>
  `,
  standalone: true,
  imports: [CardComponent, AsyncPipe, NgIf],
})
export class CityCardComponent implements OnInit {
  cities$: Observable<City[]> = of([]);

  constructor(private http: FakeHttpService, public store: CityStore) {}

  ngOnInit(): void {
    this.cities$ = this.http.fetchCities$;
  }

  getCityName(city: City) {
    return city.name;
  }
}
