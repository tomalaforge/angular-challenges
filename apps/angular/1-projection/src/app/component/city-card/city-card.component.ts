import { Component, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
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
    <app-card [list]="cities()" class="bg-light-green" (add)="add()">
      <img src="assets/img/student.webp" width="200px" />
      <app-list-item *app-card-item="let student" (delete)="delete(student.id)">
        {{ student.name }},
        <em>{{ student.country }}</em>
      </app-list-item>
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, ListItemComponent, CardItemDirective],
})
export class CityCardComponent implements OnInit {
  cities = toSignal(this.store.cities$, { initialValue: [] });
  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((s) => this.store.addAll(s));
  }

  add() {
    this.store.addOne(randomCity());
  }
  delete(id: number) {
    this.store.deleteOne(id);
  }
}
