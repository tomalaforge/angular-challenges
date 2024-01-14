import { Injectable } from '@angular/core';
import { SortDirection } from '@angular/material/sort';
import { User, randUser } from '@ngneat/falso';
import { map, take, timer } from 'rxjs';

type SortDirectionIndex = 1 | -1 | 0;

const sort: Record<SortDirection, SortDirectionIndex> = {
  asc: 1,
  desc: -1,
  '': 0,
};

@Injectable({ providedIn: 'root' })
export class FakeBackendService {
  private readonly users = randUser({ length: 10 });

  getUsers = (active: keyof User, dir: SortDirection, pageIndex: number) =>
    timer(0, 1000).pipe(
      take(1),
      map(() => this.sortByKey(this.users, active, sort[dir])),
    );

  private sortByKey(
    arr: User[],
    key: keyof User,
    direction: SortDirectionIndex,
  ): User[] {
    return arr.sort((a, b) => {
      const valueA = a[key];
      const valueB = b[key];

      if (valueA < valueB) {
        return -1 * direction;
      } else if (valueA > valueB) {
        return 1 * direction;
      } else {
        return 0;
      }
    });
  }
}
