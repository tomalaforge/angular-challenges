import {
  Component,
  inject,
  Injector,
  OnInit,
  signal,
  Signal,
  ViewEncapsulation,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import {
  AddButton,
  DeleteButton,
  Image,
} from '../../directive/slots.directive';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card [list]="cities()" customClass="bg-light-blue">
      <img image src="assets/img/city.png" width="200px" alt="city-image" />
      <ng-template #listTemplate let-city>
        <app-list-item>
          {{ city.name }}
          <button (click)="deleteCity(city.id)" delete-button>
            <img class="h-5" src="assets/svg/trash.svg" alt="icon trash" />
          </button>
        </app-list-item>
      </ng-template>
      <button
        (click)="addCity()"
        add-button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2">
        Add
      </button>
    </app-card>
  `,
  imports: [CardComponent, ListItemComponent, Image, AddButton, DeleteButton],
  styles: [
    `
      .bg-light-blue {
        background-color: rgba(0, 0, 250, 0.1);
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class CityCardComponent implements OnInit {
  cities: Signal<City[]> = signal([]);
  inject = inject(Injector);
  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((s) => this.store.addAll(s));
    this.cities = toSignal(this.store.cities$, {
      injector: this.inject,
      initialValue: [],
    });
  }

  addCity(): void {
    this.store.addOne(randomCity());
  }

  deleteCity(id: number): void {
    this.store.deleteOne(id);
  }
}
