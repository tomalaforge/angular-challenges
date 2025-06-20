import { signal, WritableSignal } from '@angular/core';


export interface Store<T> {
    getItems(): WritableSignal<T[]>;
    deleteOne(id: number): void;
}