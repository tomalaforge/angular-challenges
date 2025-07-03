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
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      img="assets/img/city.png"
      customClass="bg-light-purple"
      (addNewItem)="addItem()">
      @for (item of cities(); track item) {
        <app-list-item
          [name]="item.name"
          [id]="item.id"
          (deleteItem)="deleteItemClick($event)"></app-list-item>
      }
    </app-card>
  `,
  imports: [CardComponent, ListItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(CityStore);
  cities = this.store.cities;

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((s) => this.store.addAll(s));
  }
  addItem() {
    this.store.addOne(randomCity());
  }
  deleteItemClick(id: number) {
    this.store.deleteOne(id);
  }
}
