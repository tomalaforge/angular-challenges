import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { CityStore } from '../data-access/city.store';
import { FakeHttpService, randomCity } from '../data-access/fake-http.service';
import { CardComponent } from '../ui/card.component';
import { ListItemComponent } from '../ui/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="store.cities()"
      (addItem)="store.addOne(randCity())"
      class="bg-yellow-50">
      <img src="assets/img/city.png" width="200px" />
      <ng-template #itemRef let-item>
        <app-list-item
          [label]="item.name"
          [id]="item.id"
          (delete)="store.deleteOne(item.id)"></app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, ListItemComponent],
})
export class CityCardComponent {
  private http = inject(FakeHttpService);
  protected store = inject(CityStore);
  randCity = () => randomCity();

  constructor() {
    this.http.fetchCities$
      .pipe(
        tap((c) => this.store.addAll(c)),
        takeUntilDestroyed(),
      )
      .subscribe();
  }
}
