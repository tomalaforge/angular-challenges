import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../ui/card/card.component';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { cityStore } from '../../data-access/city.store';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-city-card',
  template: `<app-card
      [list]="cities$ | async"
      [specialTemplate]="specialTemplate"
      customClass="bg-light-blue">
      <img headerImg src="assets/img/student.webp" width="200px" />
      <button
        addNewItem
        class="border border-blue-500 bg-blue-300 p-2 rounded-sm"
        (click)="addNewItem()">
        Add
      </button>
    </app-card>
    <ng-template #specialTemplate let-item>
      <div class="border border-grey-300 py-1 px-2 flex justify-between">
        {{ item.name }}
        <button (click)="deleteCity(item.id)">
          <img class="h-5" src="assets/svg/trash.svg" />
        </button>
      </div>
    </ng-template> `,
  styles: [
    `
      :host {
        --bg-light-blue: rgba(0, 0, 250, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, AsyncPipe, JsonPipe],
})
export class CityCardComponent implements OnInit {
  public cities$ = this.store.cities$;
  constructor(private http: FakeHttpService, private store: cityStore) {}

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
