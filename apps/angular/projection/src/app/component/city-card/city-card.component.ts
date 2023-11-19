import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Signal,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';
import { CardDirective } from '../../ui/directive/card.directive';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  standalone: true,
  imports: [CardComponent, ListItemComponent, CardDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .bg-light-blue {
        background-color: rgba(0, 0, 250, 0.1);
      }
    `,
  ],
  template: `<app-card
    class="bg-light-blue"
    [list]="cities$()"
    (add)="onAddNewItem()">
    <img src="assets/img/city.png" width="200px" />
    <ng-template tmplRow let-city>
      <app-list-item (delete)="onDeleteAnItem(city.id)">
        {{ city.name }}
      </app-list-item>
    </ng-template>
  </app-card>`,
})
export class CityCardComponent implements OnInit {
  private http: FakeHttpService = inject(FakeHttpService);
  private store: CityStore = inject(CityStore);
  cities$: Signal<City[]> = toSignal(this.store.cities$, {
    initialValue: [],
  });

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
  }

  public onAddNewItem(): void {
    this.store.addOne(randomCity());
  }

  public onDeleteAnItem(id: number): void {
    this.store.deleteOne(id);
  }
}
