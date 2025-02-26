import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { ListItemDirective } from '../../ui/list-item/list-item.directive';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities()"
      customClass="bg-light-blue"
      (addNewItem)="addNewCity()">
      <img ngSrc="assets/img/city.png" width="200" height="200" />

      <ng-template appListItem let-item>
        <app-list-item
          [id]="item.id"
          [name]="item.name"
          [type]="item.type"
          (deleteItem)="deleteCity(item.id)" />
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      ::ng-deep .bg-light-blue {
        background-color: rgba(0, 42, 250, 0.1);
      }
    `,
  ],
  imports: [
    CardComponent,
    ListItemComponent,
    ListItemDirective,
    NgOptimizedImage,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(CityStore);

  cities = this.store.cities;

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((res: City[]) => this.store.addAll(res));
  }

  addNewCity(): void {
    this.store.addOne(randomCity());
  }

  deleteCity(id: number): void {
    this.store.deleteOne(id);
  }
}
