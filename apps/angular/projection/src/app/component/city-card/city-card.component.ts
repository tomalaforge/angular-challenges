import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { ListItemTemplateDirective } from '../../directive/list-item-template.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="(store.cities$ | async) ?? []"
      class="bg-light-blue"
      (addItem)="addItem()">
      <img src="assets/img/angular-challenge.webp" width="200px" />
      <ng-template let-item list-item-template>
        <app-list-item [name]="item.name" (deleteItem)="deleteItem(item.id)">
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      .bg-light-blue {
        background-color: rgba(0, 0, 250, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [
    CardComponent,
    ListItemComponent,
    ListItemTemplateDirective,
    AsyncPipe,
  ],
})
export class CityCardComponent implements OnInit {
  constructor(
    private readonly http: FakeHttpService,
    public readonly store: CityStore
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
  }

  addItem() {
    this.store.addOne(randomCity());
  }

  deleteItem(id: number) {
    this.store.deleteOne(id);
  }
}
