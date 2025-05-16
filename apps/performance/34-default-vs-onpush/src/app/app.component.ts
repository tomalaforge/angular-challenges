import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { randFirstName } from '@ngneat/falso';
import { BehaviorSubject } from 'rxjs';
import { RandomComponent } from './components/random.component';
import { PersonListComponent } from './container/person-list.component';

@Component({
  imports: [AsyncPipe, PersonListComponent, RandomComponent],
  selector: 'app-root',
  template: `
    <app-random />

    <div class="flex">
      <app-person-list
        [names]="girlList$ | async"
        title="Female"
        (newName)="addName($event)" />
      <app-person-list
        [names]="boyList$ | async"
        title="Male"
        (newName)="addName($event)" />
    </div>
  `,
})
export class AppComponent {
  private girlListSubject = new BehaviorSubject<string[]>(
    randFirstName({ gender: 'female', length: 10 }),
  );
  private boyListSubject = new BehaviorSubject<string[]>(
    randFirstName({ gender: 'male', length: 10 }),
  );

  girlList$ = this.girlListSubject.asObservable();
  boyList$ = this.boyListSubject.asObservable();

  addName({ title, name }: { title: string; name: string }) {
    if (title === 'Female') {
      const current = this.girlListSubject.value;
      this.girlListSubject.next([name, ...current]);
    } else {
      const current = this.boyListSubject.value;
      this.boyListSubject.next([name, ...current]);
    }
  }
}
