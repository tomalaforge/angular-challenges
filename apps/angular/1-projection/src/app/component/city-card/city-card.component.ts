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
import { CardItemDirective } from '../../ui/card/card-item.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="store.cities()"
      customClass="bg-blue-100"
      (add)="store.addOne(randomCity())">
      <ng-template appCardItem let-city>
        <app-list-item
          [id]="$any(city).id"
          [name]="$any(city).name"
          (delete)="store.deleteOne($event)" />
      </ng-template>
    </app-card>
  `,
  imports: [CardComponent, CardItemDirective, ListItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  protected store = inject(CityStore);

  randomCity = randomCity;

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
  }
}
