import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
} from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [image]="'assets/img/city.png'"
      [list]="vm()"
      customClass="city-card"
      (add)="add()"
      (delete)="delete($event)"></app-card>
  `,
  styles: [
    `
      .city-card {
        background-color: rgba(0, 0, 250, 0.1);
      }
    `,
  ],
  imports: [CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(CityStore);

  vm = computed(() =>
    this.store.cities().map((c /*: City */) => ({
      id: c.id,
      label: c.name,
    })),
  );

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
  }

  add() {
    this.store.addOne(randomCity());
  }

  delete(id: number | Event) {
    let idNumber: number | undefined;

    if (typeof id === 'number') {
      idNumber = id;
    } else {
      // If the emitter sends a CustomEvent with detail
      const maybeCustom = id as CustomEvent;
      if (maybeCustom?.detail !== undefined) {
        idNumber = Number(maybeCustom.detail);
      } else {
        // Fallback: try to read a value from the event target (e.g. input/button)
        const target = (id as Event).target as HTMLInputElement | null;
        if (target && target.value !== undefined) {
          idNumber = Number(target.value);
        }
      }
    }

    if (typeof idNumber === 'number' && !Number.isNaN(idNumber)) {
      this.store.deleteOne(idNumber);
    }
  }
}
