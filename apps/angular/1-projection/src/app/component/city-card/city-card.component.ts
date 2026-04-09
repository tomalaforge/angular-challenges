import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardComponent, CardItemDirective } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  standalone: true,
  template: `
    <app-card [list]="cities()" customClass="bg-pink" (added)="addNewItem()">
      <img
        card-image
        ngSrc="assets/img/city.png"
        width="200"
        height="200"
        alt="city" />
      <ng-template cardItem let-city>
        <app-list-item (deleted)="deleteItem(city.id)">
          {{ city.name }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      .bg-pink {
        background-color: rgba(111, 20, 20, 0.5);
      }
    `,
  ],
  imports: [
    CardComponent,
    CardItemDirective,
    NgOptimizedImage,
    ListItemComponent,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(CityStore);
  cities = this.store.cities;
  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
  }
  addNewItem() {
    this.store.addOne(randomCity());
  }

  deleteItem(id: number) {
    this.store.deleteOne(id);
  }
}
