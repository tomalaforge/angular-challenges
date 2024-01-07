import { School } from '@angular-challenges/ngrx-notification/model';
import { Injectable } from '@angular/core';
import {
  ComponentStore,
  OnStoreInit,
  tapResponse,
} from '@ngrx/component-store';
import { pipe, switchMap } from 'rxjs';
import { HttpService } from '../data-access/http.service';

@Injectable()
export class SchoolStore
  extends ComponentStore<{ schools: School[] }>
  implements OnStoreInit
{
  readonly schools$ = this.select((state) => state.schools);

  constructor(private httpService: HttpService) {
    super({ schools: [] });
  }

  addSchool = this.updater((state, school: School) => ({
    ...state,
    schools: [...state.schools, school],
  }));

  updateSchool = this.updater((state, school: School) => ({
    ...state,
    schools: state.schools.map((t) => (t.id === school.id ? school : t)),
  }));

  private readonly loadSchools = this.effect<void>(
    pipe(
      switchMap(() =>
        this.httpService.getAllSchools().pipe(
          tapResponse(
            (schools) => this.patchState({ schools }),
            (_) => _,
          ),
        ),
      ),
    ),
  );

  ngrxOnStoreInit() {
    this.loadSchools();
  }
}
