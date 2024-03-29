import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { ListItemDirective } from '../../ui/list-item/list-item.directive';
import { type } from '../../utils/type-helper';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card [list]="cities()" (add)="addCity()" [bgColor]="bgColor">
      <img src="assets/img/city.png" width="200px" />

      <ng-template [listItem]="type" let-item="item">
        <app-list-item [name]="item.name" (deleted)="delete(item.id)" />
      </ng-template>
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, ListItemComponent, ListItemDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent implements OnInit {
  private store = inject(CityStore);
  private http = inject(FakeHttpService);

  public cities = toSignal(this.store.cities$, { initialValue: [] });
  public readonly bgColor = 'rgba(0, 0, 250, 0.1)';
  public readonly type = type<City>();

  public ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
  }

  public delete(id: number): void {
    this.store.deleteOne(id);
  }

  public addCity(): void {
    this.store.addOne(randomCity());
  }
}
