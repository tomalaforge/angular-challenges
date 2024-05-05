import { Component, OnInit, inject } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities"
      customClass="bg-light-yellow"
      (addItem)="addItem()">
      <img img-holder src="assets/img/city.png" width="200px" />
      <ng-template #card let-item>
        <app-list-item
          [name]="item.name"
          (deleteItem)="delete($event)"
          [id]="item.id"></app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  styles: [
    `
      ::ng-deep .bg-light-yellow {
        background-color: rgba(243, 236, 9, 0.48);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent],
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];

  private http = inject(FakeHttpService);
  private store = inject(CityStore);

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
    this.store.cities$.subscribe((c) => (this.cities = c));
  }

  addItem() {
    this.store.addOne(randomCity());
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }
}
