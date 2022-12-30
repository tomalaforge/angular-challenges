import {Component, OnInit} from '@angular/core';
import {FakeHttpService, randomCity} from '../../data-access/fake-http.service';
import {CityStore} from '../../data-access/city.store';
import {City} from '../../model/city.model';
import {CardComponent} from '../../ui/card/card.component';
import {ListItemComponent} from '../../ui/list-item/list-item.component';
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {ListItemTemplateDirective} from "../../directive/list-item-template.directive";

@Component({
  selector: 'app-city-card',
  template: `<app-card
    [list]="cities$ | async"
    (add)="addCity()"
  class="bg-light-yellow"
  >
    <img
      src="assets/img/city.png"
      width="200px"
    />
  <ng-template list-item-template let-city>
      <app-list-item
        [name]="city.name"
        (delete)="delete(city.id)"
      ></app-list-item>
    </ng-template>
  </app-card>`,
  styles: [
    `
      .bg-light-yellow {
        background-color: rgba(250, 250, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, ListItemComponent, AsyncPipe, ListItemTemplateDirective],
})
export class CityCardComponent implements OnInit {
  cities$: Observable<City[]> = this.store.cities$;

  constructor(private readonly http: FakeHttpService, private readonly store: CityStore) {
  }

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((t) => this.store.addAll(t));
  }

  addCity(): void {
    this.store.addOne(randomCity());
  }

  delete(id: number): void {
    this.store.deleteOne(id);
  }
}
