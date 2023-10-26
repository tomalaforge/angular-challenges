import { Component, OnInit, inject } from '@angular/core';
import { CardComponent } from '../../ui/card/card.component';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { CommonModule, NgIf } from '@angular/common';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-city-card',
  template: `
    <ng-container *ngIf="fetchCities$ | async as fetchedCities">
      <ng-container *ngIf="cities$ | async as cities">
        <app-card
          [list]="cities"
          (delete)="delete($event)"
          customClass="bg-light-blue">
          <img
            alt="student"
            cardImage
            src="assets/img/city.jpg"
            width="200px" />
          <button
            addNewItemBtn
            class="border border-blue-500 bg-blue-300 p-2 rounded-sm"
            (click)="addNewItem()">
            Add
          </button>
        </app-card>
      </ng-container>
    </ng-container>
  `,
  standalone: true,
  imports: [CommonModule, CardComponent, NgIf],
})
export class CityCardComponent {
  private store = inject(CityStore);
  private http = inject(FakeHttpService);
  cities$: Observable<City[]> = this.store.cities$;
  fetchCities$: Observable<City[]> = this.http.fetchCities$.pipe(
    tap((t) => this.store.addAll(t))
  );

  addNewItem() {
    this.store.addOne(randomCity());
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }
}
