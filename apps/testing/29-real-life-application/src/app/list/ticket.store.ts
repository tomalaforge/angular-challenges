import { Injectable, inject } from '@angular/core';
import {
  ComponentStore,
  OnStateInit,
  OnStoreInit,
} from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { pipe } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { BackendService, Ticket, User } from '../backend.service';

export interface TicketState {
  tickets: Ticket[];
  search: string;
  users: User[];
  loading: boolean;
  error: unknown;
}

const initialState: TicketState = {
  tickets: [],
  search: '',
  users: [],
  loading: false,
  error: '',
};

@Injectable()
export class TicketStore
  extends ComponentStore<TicketState>
  implements OnStoreInit, OnStateInit
{
  readonly users$ = this.select((state) => state.users);
  readonly error$ = this.select((state) => state.error);
  readonly loading$ = this.select((state) => state.loading);
  private readonly ticketsInput$ = this.select((state) => state.tickets);
  private readonly search$ = this.select((state) => state.search);

  private readonly ticketsUsers$ = this.select(
    this.users$,
    this.ticketsInput$,
    (users, tickets) =>
      users && users.length > 0
        ? tickets.map((ticket) => ({
            ...ticket,
            assignee:
              users.find((user) => user.id === ticket.assigneeId)?.name ??
              'unassigned',
          }))
        : tickets,
  );

  readonly tickets$ = this.select(
    this.ticketsUsers$,
    this.search$,
    (tickets, search) =>
      tickets.filter((t) =>
        t.description.toLowerCase().includes(search.toLowerCase()),
      ),
  );

  readonly vm$ = this.select(
    {
      tickets: this.tickets$,
      users: this.users$,
      loading: this.loading$,
      error: this.error$,
    },
    { debounce: true },
  );

  readonly updateAssignee = this.updater((state, ticket: Ticket) => {
    const newTickets = [...state.tickets];
    const index = newTickets.findIndex((t) => t.id === ticket.id);
    newTickets[index] = ticket;
    return {
      ...state,
      loading: false,
      tickets: newTickets,
    };
  });

  readonly search = this.updater((state, search: string) => ({
    ...state,
    search,
  }));

  private backend = inject(BackendService);

  ngrxOnStoreInit() {
    this.setState(initialState);
  }

  ngrxOnStateInit() {
    this.loadTickets();
    this.loadUsers();
  }

  readonly loadTickets = this.effect<void>(
    pipe(
      tap(() => this.patchState({ loading: true, error: '' })),
      mergeMap(() =>
        this.backend.tickets().pipe(
          tapResponse(
            (tickets) =>
              this.patchState({
                loading: false,
                tickets,
              }),
            (error: unknown) => this.patchState({ error, loading: false }),
          ),
        ),
      ),
    ),
  );

  readonly loadUsers = this.effect<void>(
    pipe(
      tap(() => this.patchState({ loading: true, error: '' })),
      mergeMap(() =>
        this.backend.users().pipe(
          tapResponse(
            (users) =>
              this.patchState({
                loading: false,
                users,
              }),
            (error: unknown) => this.patchState({ error, loading: false }),
          ),
        ),
      ),
    ),
  );

  readonly addTicket = this.effect<string>(
    pipe(
      tap(() => this.patchState({ loading: true, error: '' })),
      mergeMap((description) =>
        this.backend.newTicket({ description }).pipe(
          tapResponse(
            (newTicket) =>
              this.patchState((state: TicketState) => ({
                loading: false,
                tickets: [...state.tickets, newTicket],
              })),
            (error: unknown) => this.patchState({ error, loading: false }),
          ),
        ),
      ),
    ),
  );

  readonly assignTicket = this.effect<{ userId: number; ticketId: number }>(
    pipe(
      tap(() => this.patchState({ loading: true, error: '' })),
      mergeMap((info) =>
        this.backend.assign(info.ticketId, Number(info.userId)).pipe(
          tapResponse(
            (newTicket) => this.updateAssignee(newTicket),
            (error: unknown) => this.patchState({ error, loading: false }),
          ),
        ),
      ),
    ),
  );

  readonly done = this.effect<number>(
    pipe(
      tap(() => this.patchState({ loading: true, error: '' })),
      mergeMap((ticketId) =>
        this.backend.complete(ticketId, true).pipe(
          tapResponse(
            (newTicket) => this.updateAssignee(newTicket),
            (error: unknown) => this.patchState({ error, loading: false }),
          ),
        ),
      ),
    ),
  );
}
