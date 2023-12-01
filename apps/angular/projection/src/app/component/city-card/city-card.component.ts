import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardListContentDefDirective } from '../../ui/card/card-list-content-def.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: ` <app-card [list]="cities$ | async" (add)="addCity()" #card>
    <img src="assets/img/city.webp" width="200px" />
    <app-list-item
      *cardListContentDef="let city; list: card.list"
      [id]="city.id"
      (delete)="deleteCity($event)">
      {{ city.name }}
    </app-list-item>
  </app-card>`,
  standalone: true,
  imports: [
    AsyncPipe,
    CardComponent,
    CardListContentDefDirective,
    ListItemComponent,
  ],
  styles: [
    `
      app-card {
        background-color: rgba(250, 133, 0, 0.1);
      }
    `,
  ],
})
export class CityCardComponent implements OnInit {
  cities$ = this.store.cities$;

  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
  }

  addCity() {
    this.store.addOne(randomCity());
  }

  deleteCity(id: number) {
    this.store.deleteOne(id);
  }
}
