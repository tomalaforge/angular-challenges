import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardListInterface } from '../../interfaces/card-list.interface';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-city-card',
  standalone: true,
  imports: [CardComponent, CommonModule],
  template: `<app-card
    [list]="cities$ | async"
    customClass="bg-light-blue"
    (addButtonClicked)="handleAdd()"
    (deleteButtonClicked)="handleDelete($event)">
    <img
      role="card-image"
      src="assets/img/cityscape-sunset-vector.jpg"
      width="200px" />
  </app-card>`,
  styles: [
    `
      :host {
        --bg-light-blue: rgba(0, 0, 250, 0.1);
      }
    `,
  ],
})
export class CityCardComponent implements OnInit, CardListInterface {
  cities$ = this.store.cities$;
  constructor(private http: FakeHttpService, private store: CityStore) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((s) => this.store.addAll(s));
  }

  handleAdd(): void {
    this.store.addOne(randomCity());
  }

  handleDelete(id: number) {
    this.store.deleteOne(id);
  }
}
