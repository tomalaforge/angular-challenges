import { NgOptimizedImage } from '@angular/common';
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
import {
  CardComponent,
  CardListItemDirective,
} from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card class="bg" [list]="store.cities()" (addedNewItem)="addItem()">
      <img ngSrc="assets/img/city.png" width="200" height="200" />

      <ng-template [app-card-list-item]="store.cities()" let-item>
        <app-list-item (deleted)="store.deleteOne(item.id)">
          {{ item.name }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      .bg {
        background-color: rgb(247, 255, 136);
      }
    `,
  ],
  imports: [
    NgOptimizedImage,
    CardComponent,
    CardListItemDirective,
    ListItemComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  protected store = inject(CityStore);

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
  }

  addItem(): void {
    this.store.addOne(randomCity());
  }
}
