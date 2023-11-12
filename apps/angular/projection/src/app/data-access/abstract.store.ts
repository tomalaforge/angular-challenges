import { BehaviorSubject } from 'rxjs';

import { Entity } from '../model/entity.model';

export abstract class AbstractStore<T extends Entity> {
  private entities = new BehaviorSubject<T[]>([]);
  protected entities$ = this.entities.asObservable();

  public addAll(entities: T[]) {
    this.entities.next(entities);
  }

  public addOne(entity: T) {
    this.entities.next([...this.entities.value, entity]);
  }

  public deleteOne(id: number) {
    this.entities.next(this.entities.value.filter((s) => s.id !== id));
  }
}
