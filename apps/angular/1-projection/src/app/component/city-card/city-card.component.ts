import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardType } from '../../model/card.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card customClass="bg-light-yellow">
      <img src="assets/img/city.png" width="200" height="200" />

      <ng-template #listTemplate>
        <section>
          @for (item of cities(); track item) {
            <app-list-item
              [name]="item.name"
              [id]="item.id"
              [type]="cardType"></app-list-item>
          }
        </section>

        <button
          class="rounded-sm border border-blue-500 bg-blue-300 p-2"
          (click)="addNewItem()">
          Add
        </button>
      </ng-template>
    </app-card>
  `,
  imports: [CardComponent, NgOptimizedImage, ListItemComponent],
  styles: [
    `
      ::ng-deep .bg-light-yellow {
        background-color: rgba(255, 255, 224);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent {
  private http = inject(FakeHttpService);
  private store = inject(CityStore);

  cities = this.store.cities;
  cardType = CardType.CITY;

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
  }

  addNewItem() {
    this.store.addOne(randomCity());
  }
}
