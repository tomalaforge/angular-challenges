import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  templateUrl: './city-card.component.html',
  standalone: true,
  imports: [CardComponent, ListItemComponent, AsyncPipe],
  styles: [
    `
      .bg-light-blue {
        background-color: rgba(0, 0, 255, 0.1);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent implements OnInit, OnDestroy {
  protected cities$ = this.store.cities$;

  private _subscriptions = new Subscription();

  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit(): void {
    this._subscriptions.add(
      this.http.fetchCities$.subscribe((c: City[]): void =>
        this.store.addAll(c),
      ),
    );
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  protected addCity() {
    this.store.addOne(randomCity());
  }

  protected deleteCity(id: number) {
    this.store.deleteOne(id);
  }
}
