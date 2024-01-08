import { School, isSchool } from '@angular-challenges/ngrx-notification/model';
import { Injectable, inject } from '@angular/core';
import {
  ComponentStore,
  OnStateInit,
  OnStoreInit,
  tapResponse,
} from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { pipe, switchMap } from 'rxjs';
import { appActions } from '../app.actions';
import { HttpService } from '../data-access/http.service';
import { TOKEN } from '../token';

// Component Store has no actions
// can't have an effect that listens to an action
@Injectable()
export class SchoolStore
  extends ComponentStore<{ schools: School[] }>
  implements OnStoreInit, OnStateInit
{
  readonly schools$ = this.select((state) => state.schools);

  constructor(
    private httpService: HttpService,
    private store: Store,
  ) {
    super({ schools: [] });
  }

  addSchool = this.updater((state, school: School): { schools: School[] } => ({
    ...state,
    schools: [...state.schools, school],
  }));

  updateSchool = this.updater(
    (state, school: School): { schools: School[] } => ({
      ...state,
      schools: state.schools.map((t) => (t.id === school.id ? school : t)),
    }),
  );

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
    this.loadSchools(); // the schools list is not empty when you navigate to the route
  }

  private notification$ = inject(TOKEN);

  ngrxOnStateInit() {
    this.addSchools();
  }

  // this adds schools to the list
  // injected the global store to dispatch action for the snackbar alert
  private readonly addSchools = this.effect<void>(
    pipe(
      switchMap(() =>
        this.notification$.pipe(
          tapResponse(
            (data) => {
              if (data && isSchool(data)) {
                this.addSchool(data);
                this.store.dispatch(
                  appActions.showAlert({
                    message: 'Add 1 School',
                    component: 'School',
                  }),
                );
              }
            },
            (_) => _, // not handling the error
          ),
        ),
      ),
    ),
  );
}
