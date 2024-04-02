import { Component, OnInit, Signal, ViewEncapsulation } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';
@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities()"
      customClass="bg-light-blue"
      (delete)="delete($event)">
      <img cardImage src="assets/img/city.png" width="200px" />

      <button
        cardActionButton
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewCity()">
        Add
      </button>
      <ng-template #listTemplateRef let-item>
        <p>{{ item.name }}</p>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  styles: [
    `
      .bg-light-blue {
        background-color: rgb(234 245 255);
      }
    `,
  ],
  imports: [CardComponent],
  encapsulation: ViewEncapsulation.None,
})
export class CityCardComponent implements OnInit {
  cities: Signal<City[]> = toSignal(this.store.cities$, { initialValue: [] });

  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((s) => this.store.addAll(s));
  }

  addNewCity() {
    this.store.addOne(randomCity());
  }
  delete(id: number) {
    this.store.deleteOne(id);
  }
}
