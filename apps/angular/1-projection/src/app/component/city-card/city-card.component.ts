import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { StoreUtilsService } from '../../data-access/store-utils.service';
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
          [name]="item.name + ', ' + item.country"
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
  providers: [StoreUtilsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private storeUtil = inject<StoreUtilsService<City>>(StoreUtilsService<City>);

  cities = this.storeUtil.getState();

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((res: City[]) =>
      this.storeUtil.addAll(res),
    );
  }

  addNewCity(): void {
    this.storeUtil.addOne(randomCity());
  }

  deleteCity(id: number): void {
    this.storeUtil.deleteOne(id, (item) => item.id);
  }
}
