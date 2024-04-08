import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CrudService<T extends { id: number }> {
  private _ressources = signal<T[]>([]);
  protected ressources = this._ressources.asReadonly();

  addAll(ressources: T[]) {
    this._ressources.set(ressources);
  }

  addOne(ressource: T) {
    this._ressources.update((ressources) => [...ressources, ressource]);
  }

  deleteOne(id: number) {
    this._ressources.update((ressources) =>
      ressources.filter((r) => r.id !== id),
    );
  }
}
