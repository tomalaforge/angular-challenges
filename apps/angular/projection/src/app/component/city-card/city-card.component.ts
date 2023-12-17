import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import {
  CardComponent,
  CardContentDirective,
  CardImageDirective,
} from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  templateUrl: 'city-card.component.html',
  styles:
    ':host { display: block; } .bg-light-blue { background-color: rgba(0, 0, 255, 0.1); }',
  standalone: true,
  imports: [
    AsyncPipe,
    CardComponent,
    CardImageDirective,
    CardContentDirective,
    ListItemComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent implements OnInit {
  cities$!: Observable<City[]>;

  constructor(
    private destroyRef: DestroyRef,
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((c) => this.store.addAll(c));

    this.cities$ = this.store.cities$.pipe(takeUntilDestroyed(this.destroyRef));
  }

  add() {
    this.store.addOne(randomCity());
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }
}
