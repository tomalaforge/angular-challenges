import { inject, Signal, signal, WritableSignal } from '@angular/core';
import { CardItem } from '../model/card.model';
import { FakeHttpService } from './fake-http.service';

export abstract class ShareStore<T extends CardItem> {
  protected http = inject(FakeHttpService);
  protected _objects: WritableSignal<T[]> = signal([]);
  public readonly objects: Signal<T[]> = this._objects.asReadonly();

  addAll(objects: T[]) {
    this._objects.set(objects);
  }

  addOne(object: T) {
    this._objects.update((objects) => [...objects, object]);
  }

  deleteOne(id: number) {
    this._objects.update((objects) => [...objects.filter((o) => o.id != id)]);
  }
}
