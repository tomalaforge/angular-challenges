import { Component, computed, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardModel } from '../../model/card.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cityCards()"
      (addNewItem)="this.addItem()"
      class="bg-light-blue">
      <img src="assets/img/city.png" width="200px" alt="city" />
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent],
  styles: [
    `
      .bg-light-blue {
        background-color: rgba(0, 0, 250, 0.1);
      }
    `,
  ],
})
export class CityCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(CityStore);
  cities = toSignal(this.store.cities$, { initialValue: [] });
  cityCards = computed(() =>
    this.cities().map(
      (value) => ({ id: value.id, name: value.name }) as CardModel,
    ),
  );

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((t) => this.store.addAll(t));
  }

  addItem() {
    this.store.addOne(randomCity());
  }
}
