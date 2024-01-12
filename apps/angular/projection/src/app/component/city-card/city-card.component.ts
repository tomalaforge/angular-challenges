import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { cityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card [list]="cities$ | async" customClass="bg-light-blue">
      <img headerImg src="assets/img/student.webp" width="200px" />
      <button
        addNewItem
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
      <ng-template #specialTemplateRef let-item>
        <app-list-item (deleteItemClicked)="deleteCity(item.id)">
          {{ item.name }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      :host {
        --bg-light-blue: rgba(0, 0, 250, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, AsyncPipe, ListItemComponent],
})
export class CityCardComponent implements OnInit {
  public cities$ = this.store.cities$;
  constructor(
    private http: FakeHttpService,
    private store: cityStore,
  ) {}

  public ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => {
      this.store.addAll(c);
    });
  }
  addNewItem(): void {
    this.store.addOne(randomCity());
  }
  deleteCity(id: number): void {
    this.store.deleteOne(id);
  }
}
