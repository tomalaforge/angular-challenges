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
import { OptionTemplateDirective } from '../../directive/option-template.directive';
import { CardType } from '../../model/card.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card [list]="cities()" [customClass]="'bg-light-yellow'">
      <img
        ngProjectAs="card-image"
        ngSrc="assets/img/city.png"
        width="200"
        height="200" />
      <ng-template appOptionTemplate let-city>
        <app-list-item>
          <ng-container ngProjectAs="item-name">{{ city.name }}</ng-container>
          <button ngProjectAs="item-action" (click)="delete(city.id)">
            <img class="h-5" src="assets/svg/trash.svg" />
          </button>
        </app-list-item>
      </ng-template>
      <button
        ngProjectAs="card-action"
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </app-card>
  `,
  styles: [
    `
      ::ng-deep .bg-light-yellow {
        background-color: rgba(218, 255, 108, 0.6);
      }
    `,
  ],
  imports: [
    ListItemComponent,
    CardComponent,
    NgOptimizedImage,
    OptionTemplateDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(CityStore);

  cities = this.store.cities;
  cardType = CardType.CITY;

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((s) => this.store.addAll(s));
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }

  addNewItem() {
    this.store.addOne(randomCity());
  }
}
