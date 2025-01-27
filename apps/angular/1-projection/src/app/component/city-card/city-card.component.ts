import { Component, OnInit } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardListItem } from '../../model/card.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cityListItems"
      class="bg-light-green"
      (addNewItemEvent)="handleAddNewItemEvent()"
      (deleteItemEvent)="handleDeleteItemEvent($event)">
      <div card-img>
        <img src="assets/img/city.png" width="200px" />
      </div>
    </app-card>
  `,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent],
})
export class CityCardComponent implements OnInit {
  cityListItems: CardListItem[] = [];

  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((e) => this.store.addAll(e));
    this.store.cities$.subscribe((cities) => {
      this.cityListItems = cities.map((city) => {
        return {
          name: city.name,
          id: city.id,
        };
      });
    });
  }

  handleAddNewItemEvent() {
    this.store.addOne(randomCity());
  }

  handleDeleteItemEvent(id: number) {
    this.store.deleteOne(id);
  }
}
