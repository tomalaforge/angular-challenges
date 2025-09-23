import { inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentStore, OnStateInit } from '@ngrx/component-store';
import { concatLatestFrom, tapResponse } from '@ngrx/operators';
import { pipe } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { PARAM_TICKET_ID } from '../app.route';
import { BackendService, Ticket } from '../backend.service';

export interface TicketState {
  ticket?: Ticket;
  loading: boolean;
  error: unknown;
}

const initialState: TicketState = {
  loading: false,
  error: '',
};

@Injectable()
export class DetailStore
  extends ComponentStore<TicketState>
  implements OnStateInit
{
  private readonly backend = inject(BackendService);
  private readonly route = inject(ActivatedRoute);

  readonly ticket$ = this.select((state) => state.ticket);
  readonly loading$ = this.select((state) => state.loading);
  readonly error$ = this.select((state) => state.error);

  readonly vm$ = this.select({
    ticket: this.ticket$,
    loading: this.loading$,
  });

  constructor() {
    super(initialState);
  }

  readonly loadTicket = this.effect<void>(
    pipe(
      concatLatestFrom(() =>
        this.route.params.pipe(map((p) => p[PARAM_TICKET_ID])),
      ),
      tap(() => this.patchState({ loading: true, error: '' })),
      mergeMap(([, id]) =>
        this.backend.ticket(id).pipe(
          tapResponse(
            (ticket) =>
              this.patchState({
                loading: false,
                ticket,
              }),
            (error: unknown) => this.patchState({ error }),
          ),
        ),
      ),
    ),
  );

  ngrxOnStateInit() {
    this.loadTicket();
  }
}
