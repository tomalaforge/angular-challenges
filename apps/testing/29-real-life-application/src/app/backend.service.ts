import { Injectable } from '@angular/core';
import { Observable, delay, of, throwError } from 'rxjs';

export type User = {
  id: number;
  name: string;
};

export interface BaseTicket {
  id: number;
  description: string;
  completed: boolean;
}

export interface Ticket extends BaseTicket {
  assigneeId: number | null;
}

export interface TicketUser extends BaseTicket {
  assignee: string;
}

function randomDelay() {
  return Math.random() * 1000;
}

@Injectable({ providedIn: 'root' })
export class BackendService {
  storedTickets: Ticket[] = [
    {
      id: 0,
      description: 'Install a monitor arm',
      assigneeId: 111,
      completed: false,
    },
    {
      id: 1,
      description: 'Move the desk to the new location',
      assigneeId: 111,
      completed: false,
    },
  ];

  storedUsers: User[] = [
    { id: 111, name: 'Thomas' },
    { id: 222, name: 'Jack' },
  ];

  lastId = 1;

  private findTicketById = (id: number) =>
    this.storedTickets.find((ticket) => ticket.id === +id);

  private findUserById = (id: number) =>
    this.storedUsers.find((user) => user.id === +id);

  tickets() {
    return of(this.storedTickets).pipe(delay(randomDelay()));
  }

  ticket(id: number): Observable<Ticket | undefined> {
    return of(this.findTicketById(id)).pipe(delay(randomDelay()));
  }

  users() {
    return of(this.storedUsers).pipe(delay(randomDelay()));
  }

  user(id: number) {
    return of(this.findUserById(id)).pipe(delay(randomDelay()));
  }

  newTicket(payload: { description: string }) {
    const newTicket: Ticket = {
      id: ++this.lastId,
      description: payload.description,
      assigneeId: null,
      completed: false,
    };

    this.storedTickets = this.storedTickets.concat(newTicket);

    return of(newTicket).pipe(delay(randomDelay()));
  }

  assign(ticketId: number, userId: number) {
    return this.update(ticketId, { assigneeId: userId });
  }

  complete(ticketId: number, completed: boolean) {
    return this.update(ticketId, { completed });
  }

  update(ticketId: number, updates: Partial<Omit<Ticket, 'id'>>) {
    const foundTicket = this.findTicketById(ticketId);

    if (!foundTicket) {
      return throwError(() => new Error('ticket not found'));
    }

    const updatedTicket = { ...foundTicket, ...updates };

    this.storedTickets = this.storedTickets.map((t) =>
      t.id === ticketId ? updatedTicket : t,
    );

    return of(updatedTicket).pipe(delay(randomDelay()));
  }
}
