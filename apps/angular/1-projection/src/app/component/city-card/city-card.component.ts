import { Component, OnInit, computed, inject } from '@angular/core';
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
      [list]="cityListItems()"
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
  private http = inject(FakeHttpService);
  private store = inject(CityStore);

  cityListItems = computed<CardListItem[]>(() =>
    this.store.cities().map((city) => ({
      name: city.name,
      id: city.id,
    })),
  );

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((e) => this.store.addAll(e));
  }

  handleAddNewItemEvent() {
    this.store.addOne(randomCity());
  }

  handleDeleteItemEvent(id: number) {
    this.store.deleteOne(id);
  }
}
