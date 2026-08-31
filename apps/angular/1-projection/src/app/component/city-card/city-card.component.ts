import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  WritableSignal,
} from '@angular/core';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { CityStore } from './../../data-access/city.store';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      customClass="bg-light-blue"
      [list]="cities()"
      [template]="listItem"
      (addNewItem)="addNewItem()">
      <img
        card-header
        ngSrc="assets/img/city.png"
        width="200"
        height="200"
        alt="" />
    </app-card>

    <ng-template #listItem let-item>
      <app-list-item
        [name]="item.name"
        [id]="item.id"
        (deleteItem)="deleteItem($event)" />
    </ng-template>
  `,
  imports: [CardComponent, NgOptimizedImage, ListItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent {
  private http: FakeHttpService = inject(FakeHttpService);
  private store: CityStore = inject(CityStore);

  protected cities: WritableSignal<City[]> = this.store.cities;

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((s) => this.store.addAll(s));
  }

  public addNewItem(): void {
    this.store.addOne(randomCity());
  }

  public deleteItem(id: number): void {
    this.store.deleteOne(id);
  }
}
