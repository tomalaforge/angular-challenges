import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-city-card',
  standalone: true,
  template: `
    <app-card
      [list]="cities()"
      (newItem)="addCity()"
      (deleteItem)="deleteCity($event)"
      customClass="bg-light-blue">
      <img
        ngProjectAs="img"
        ngSrc="assets/img/city.png"
        width="200"
        height="200"
        alt="teacher" />

      <ng-template let-item="item">
        {{ item.name }}
        <button (click)="deleteCity(item.id)">
          <img
            class="h-5"
            ngSrc="assets/svg/trash.svg"
            width="200"
            height="200"
            alt="trash" />
        </button>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      .bg-light-blue {
        background-color: rgba(0, 0, 250, 0.1);
      }
    `,
  ],
  imports: [CardComponent, NgOptimizedImage],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent {
  private http = inject(FakeHttpService);
  private store = inject(CityStore);

  cities = this.store.cities;

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((s) => this.store.addAll(s));
  }

  addCity() {
    this.store.addOne(randomCity());
  }

  deleteCity(id: number) {
    this.store.deleteOne(id);
  }
}
