import { School, isSchool } from '@angular-challenges/power-of-effect/model';
import { Injectable, inject } from '@angular/core';
import { ComponentStore, OnStoreInit } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { Observable, filter, pipe, switchMap, withLatestFrom } from 'rxjs';
import { PUSH_NOTIFICATION } from '../app.config';
import { HttpService } from '../data-access/http.service';
import { MessageService } from '../message.service';

@Injectable()
export class SchoolStore
  extends ComponentStore<{ schools: School[] }>
  implements OnStoreInit
{
  readonly schools$ = this.select((state) => state.schools);
  readonly #schoolNotification = inject<Observable<School>>(
    PUSH_NOTIFICATION,
  ).pipe(
    filter(isSchool),
    withLatestFrom(this.schools$),
    filter(
      ([newSchool, currentSchools]) =>
        currentSchools.filter((s) => s.id === newSchool.id).length === 0, //filter out already added school
    ),
  );
  readonly #httpService = inject(HttpService);
  readonly #messageService = inject(MessageService);

  constructor() {
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

  readonly #loadSchools = this.effect<void>(
    pipe(
      switchMap(() =>
        this.#httpService.getAllSchools().pipe(
          tapResponse(
            (schools) => this.patchState({ schools }),
            (_) => _, // not handling the error
          ),
        ),
      ),
    ),
  );

  readonly #onSchoolNotification = this.effect<void>(
    pipe(
      switchMap(() =>
        this.#schoolNotification.pipe(
          tapResponse(
            ([school]) => {
              this.addSchool(school);
              this.#messageService.showMessage(
                `A new school has been added ${school.name}.`,
              );
            },
            (_) => _, // not handling the error
          ),
        ),
      ),
    ),
  );

  ngrxOnStoreInit() {
    this.#loadSchools();
    this.#onSchoolNotification();
  }
}
