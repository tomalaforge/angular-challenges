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

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities()"
      [itemTemplateRef]="listItemTemplate"
      (itemAdded)="addItem()"
      customClass="bg-light-red">
      <img src="assets/img/teacher.png" card-image width="200" height="200" />
    </app-card>
    <ng-template #listItemTemplate let-item>
      {{ item.name }}
      <button (click)="onItemDeleted(item)">
        <img class="h-5" src="assets/svg/trash.svg" />
      </button>
    </ng-template>
  `,
  imports: [CardComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(CityStore);
  cities = this.store.cities;

  ngOnInit() {
    this.http.fetchCities$.subscribe((cityArray) =>
      this.store.addAll(cityArray),
    );
  }
  onItemDeleted(item: any) {
    this.store.deleteOne(item.id);
  }
  addItem() {
    this.store.addOne(randomCity());
  }
}
