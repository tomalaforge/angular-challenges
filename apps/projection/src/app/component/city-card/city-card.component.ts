import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-city-card',
  template: `<app-card
    *ngIf="cities$ | async as items"
    [list]="items"
    name-property="name"
    customClass="bg-light-grey"
    image="assets/img/student.webp"
    (delete)="onDelete($event)"
    (add)="onAdd()"></app-card>`,
  standalone: true,
  imports: [CardComponent, NgIf, AsyncPipe],
  styles: [
    `
      ::ng-deep .bg-light-grey {
        background-color: #eee;
      }
    `,
  ],
})
export class CityCardComponent implements OnInit {
  cities$ = this.store.cities$;

  constructor(private http: FakeHttpService, private store: CityStore) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((s) => this.store.addAll(s));
  }

  onDelete(id: number) {
    this.store.deleteOne(id);
  }

  onAdd() {
    this.store.addOne(randomCity());
  }
}
