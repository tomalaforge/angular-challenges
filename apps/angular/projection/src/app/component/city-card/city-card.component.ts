import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { tap } from 'rxjs';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
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
  public cities = this.store.cities;

  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {
    this.http.fetchCities$.pipe(tap((s) => this.store.addAll(s))).subscribe();
  }

  public addCity(): void {
    this.store.addOne(randomCity());
  }

  public delete(id: number): void {
    this.store.deleteOne(id);
  }
}
