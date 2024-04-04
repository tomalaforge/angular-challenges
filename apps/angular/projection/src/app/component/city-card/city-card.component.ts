import { NgOptimizedImage } from '@angular/common';
import { Component, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap, tap } from 'rxjs';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import {
  CardComponent,
  CardListItemDirective,
} from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  templateUrl: './city-card.component.html',
  standalone: true,
  styles: [
    `
      .bg-light-yellow {
        background-color: rgba(255, 243, 0, 0.1);
      }
    `,
  ],
  imports: [
    CardComponent,
    CardListItemDirective,
    ListItemComponent,
    NgOptimizedImage,
  ],
})
export class CityCardComponent {
  public cities: Signal<Array<City>> = toSignal(
    this.http.fetchCities$.pipe(
      tap((s) => this.store.addAll(s)),
      switchMap(() => this.store.cities$),
    ),
    { initialValue: [] as City[] },
  );

  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  public addCity(): void {
    this.store.addOne(randomCity());
  }

  public delete(id: number): void {
    this.store.deleteOne(id);
  }
}
