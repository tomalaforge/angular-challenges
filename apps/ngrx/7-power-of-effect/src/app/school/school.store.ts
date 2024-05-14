import { isSchool, School } from '@angular-challenges/power-of-effect/model';
import { inject, Injectable } from '@angular/core';
import {
  ComponentStore,
  OnStateInit,
  OnStoreInit,
  tapResponse,
} from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { filter, pipe, switchMap } from 'rxjs';
import { HttpService } from '../data-access/http.service';
import { PUSH_TOKEN } from '../push-token';
import { schoolActions } from './school.actions';

@Injectable()
export class SchoolStore
  extends ComponentStore<{ schools: School[] }>
  implements OnStoreInit, OnStateInit
{
  private readonly store = inject(Store);
  readonly schools$ = this.select((state) => state.schools);

  constructor(private httpService: HttpService) {
    super({ schools: [] });
  }

  upsertSchool = this.updater((state, school: School) => ({
    ...state,
    schools: state.schools.some((t) => t.id === school.id)
      ? state.schools.map((t) => (t.id === school.id ? school : t))
      : [...state.schools, school],
  }));

  private readonly loadSchools = this.effect<void>(
    pipe(
      switchMap(() =>
        this.httpService.getAllSchools().pipe(
          tapResponse(
            (schools) => this.patchState({ schools }),
            (_) => _, // not handling the error
          ),
        ),
      ),
    ),
  );

  ngrxOnStoreInit() {
    this.loadSchools();
  }

  ngrxOnStateInit() {
    this.effect(() =>
      inject(PUSH_TOKEN).pipe(
        filter(Boolean),
        filter(isSchool),
        tapResponse({
          next: (school) => {
            this.upsertSchool(school);
            this.store.dispatch(schoolActions.addOneSchool({ school }));
          },
          error: (_) => _, // not handling the error
        }),
      ),
    );
  }
}
