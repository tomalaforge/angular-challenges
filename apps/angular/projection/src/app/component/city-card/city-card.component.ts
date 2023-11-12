import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { ListItemTemplateDirective } from '../../utils/list-item-template.directive';

@Component({
  selector: 'app-city-card',
  template: `<app-card
    class="bg-light-blue"
    [list]="cities()"
    (added)="addNewItem()">
    <img src="assets/img/teacher.png" width="200px" />
    <ng-template listItemTemplate #rowRef let-city>
      <app-list-item (deleted)="deleteCity(city.id)">
        {{ city.name }}
      </app-list-item>
    </ng-template>
  </app-card>`,
  styles: [
    `
      .bg-light-blue {
        background-color: rgba(0, 0, 250, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [
    CardComponent,
    ListItemComponent,
    AsyncPipe,
    ListItemTemplateDirective,
  ],
})
export class CityCardComponent implements OnInit {
  public cities = this.store.cities;

  constructor(private http: FakeHttpService, public store: CityStore) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
  }

  addNewItem(): void {
    this.store.addOne(randomCity());
  }

  deleteCity(id: number): void {
    this.store.deleteOne(id);
  }
}
