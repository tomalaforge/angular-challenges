import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { Card } from '../../model/card';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card (addMoreEvent)="addOne()">
      <img src="assets/img/city.png" width="200px" />
      <section>
        @for (item of cities; track item.name) {
          <app-list-item
            (deleteEvent)="removeOne($event)"
            [name]="item.name"
            [id]="item.id"></app-list-item>
        }
      </section>
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, ListItemComponent, NgForOf],
})
export class CityCardComponent implements OnInit, Card {
  cities: City[] = [];

  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((t) => this.store.addAll(t));

    this.store.cities$.subscribe((t) => (this.cities = t));
  }

  addOne() {
    this.store.addOne(randomCity());
  }

  removeOne(id: number) {
    this.store.deleteOne(id);
  }

  protected readonly of = of;
}
