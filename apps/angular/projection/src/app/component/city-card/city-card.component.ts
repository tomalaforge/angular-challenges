import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardComponent } from '../../ui/card/card.component';

import { CityStore } from '../../data-access/city.store';
import { City } from '../../model/city.model';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="city$ | async"
      [content]="'name'"
      [imgTemplate]="imgTemplate"
      [buttonTemplate]="buttonTemplate"
      [deleteTemplate]="deleteTemplate"></app-card>
    <ng-template #imgTemplate>
      <img src="assets/img/city.png" width="200px" />
    </ng-template>
    <ng-template #buttonTemplate>
      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </ng-template>
    <ng-template #deleteTemplate let-id>
      <button (click)="delete(id)">
        <img class="h-5" src="assets/svg/trash.svg" />
      </button>
    </ng-template>
  `,
  standalone: true,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, AsyncPipe],
})
export class CityCardComponent implements OnInit {
  city$: Observable<City[]> = this.store.cities$;

  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((s) => this.store.addAll(s));
  }

  addNewItem() {
    this.store.addOne(randomCity());
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }
}
