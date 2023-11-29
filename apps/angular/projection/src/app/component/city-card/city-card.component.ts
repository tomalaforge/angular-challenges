import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardType } from '../../model/card.model';
import { City } from '../../model/city.model';
import { CardTemplateContentDirective } from '../../ui/card/card-template-content.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `<app-card
    [list]="cities$ | async"
    [type]="cardType"
    customClass="bg-light-blue"
    (addItemEvent)="addCity()">
    <img src="assets/img/city.png" alt="image of city" width="200px" />
    <ng-template let-city appCardTemplateContent>
      <app-list-item
        [id]="city?.id"
        [name]="city?.name"
        (deleteItem)="deleteCity($event)"></app-list-item>
    </ng-template>
  </app-card>`,
  styles: [
    `
      :host {
        --card-bg-color: rgba(0, 0, 250, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [
    CardComponent,
    ListItemComponent,
    CardTemplateContentDirective,
    AsyncPipe,
  ],
})
export class CityCardComponent implements OnInit {
  cardType = CardType.CITY;
  cities$!: Observable<City[]>;
  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
    this.cities$ = this.store.cities$;
  }

  addCity() {
    this.store.addOne(randomCity());
  }

  deleteCity(id: number) {
    this.store.deleteOne(id);
  }
}
