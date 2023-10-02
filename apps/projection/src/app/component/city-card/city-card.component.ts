import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CityStore } from '../../data-access/city.store';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemTemplateDirective } from '../../directives/list-item-template.directive';

@Component({
  selector: 'app-city-card',
  template: `<app-card
    [list]="cities"
    (addNewItem)="onAddNewItem()"
    (deleteItem)="onDeleteItem($event)">
    <ng-template [appListItemTemplate] let-item>
      {{ item.name }}({{ item.country }})
    </ng-template>
  </app-card>`,
  standalone: true,
  styles: [
    `
      :host {
        --card-background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemTemplateDirective],
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];

  constructor(private http: FakeHttpService, private store: CityStore) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((s) => this.store.addAll(s));

    this.store.cities$.subscribe((s) => (this.cities = s));
  }

  onAddNewItem() {
    this.store.addOne(randomCity());
  }

  onDeleteItem(id: number) {
    this.store.deleteOne(id);
  }
}
