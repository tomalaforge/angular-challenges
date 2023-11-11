import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../ui/card/card.component';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { CityStore } from '../../data-access/city.store';

@Component({
  selector: 'app-city-card',
  template: `<app-card
    [list]="students()"
    (addItem)="addCity()"
    (deleteItem)="removeCity($event)"
    customClass="bg-light-blue">
    <img src="assets/img/city.png" width="200px" />
    <ng-template let-item="item">
      {{ item.name }}
    </ng-template>
  </app-card>`,
  standalone: true,
  imports: [CardComponent],
})
export class CityCardComponent implements OnInit {
  students = toSignal<City[], City[]>(this.store.data$, { initialValue: [] });

  constructor(private http: FakeHttpService, private store: CityStore) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((s) => this.store.addAll(s));
  }

  addCity() {
    this.store.addOne(randomCity());
  }

  removeCity(id: number) {
    this.store.deleteOne(id);
  }
}
