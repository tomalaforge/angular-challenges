import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FakeHttpService, randomCity } from '../../data-access/fake-http.service';
import { CardComponent } from '../../ui/card/card.component';
import { AsyncPipe } from '@angular/common';
import { City } from '../../model/city.model';
import { CityStore } from '../../data-access/city.store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities$ | async"
      customClass="bg-light-blue"
      [listTemplateRef]="listTemplateRef"
      (delete)="delete($event)">
   
      <img cardImage
        src="assets/img/city.png"
        width="200px" /> 

        <button cardActionButton
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewCity()">
        Add
      </button>
    </app-card>

    <ng-template #listTemplateRef let-item>
        <p>{{item.name}}</p>
    </ng-template>
  `,
  standalone: true,
  styles: [
    `
      .bg-light-blue {
        background-color: rgb(234 245 255);
      }
    `,
  ],
  imports: [CardComponent, AsyncPipe],
  encapsulation:ViewEncapsulation.None
})
export class CityCardComponent implements OnInit{
  cities$: Observable<City[]> = this.store.cities$;

  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) { }

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((s) => this.store.addAll(s));
  }

  addNewCity() {
    this.store.addOne(randomCity());
  }
  delete(id: number) {
    this.store.deleteOne(id);
  }
}
