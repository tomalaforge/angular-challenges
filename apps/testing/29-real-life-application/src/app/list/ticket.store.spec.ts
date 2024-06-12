import { provideComponentStore } from '@ngrx/component-store';
import { render } from '@testing-library/angular';
import { Observable, lastValueFrom, of, take, throwError } from 'rxjs';
import { BackendService, Ticket, User } from '../backend.service';
import { TicketStore } from './ticket.store';

const storedTickets: Ticket[] = [
  {
    id: 0,
    description: 'Install a monitor arm',
    assigneeId: 111,
    completed: false,
  },
  {
    id: 1,
    description: 'Move the desk to the new location',
    assigneeId: 222,
    completed: false,
  },
  {
    id: 2,
    description: 'Ticket for me',
    assigneeId: 111,
    completed: false,
  },
];

const storedUsers: User[] = [
  { id: 111, name: 'Thomas' },
  { id: 222, name: 'Jack' },
  { id: 333, name: 'Tson' },
];

const NEW_TICKET: Ticket = {
  id: 3,
  description: '',
  assigneeId: null,
  completed: false,
};

type MockBackendServiceType = {
  users: jest.Mock<Observable<User[]>>;
  tickets: jest.Mock<Observable<Ticket[]>>;
  newTicket: jest.Mock<Observable<Ticket>>;
  assign: jest.Mock<Observable<Ticket>>;
  complete: jest.Mock<Observable<Ticket>>;
};

const users = jest.fn(() => of(storedUsers));
const tickets = jest.fn(() => of(storedTickets));
const newTicket = jest.fn((payload: { description: string }) =>
  of({
    ...NEW_TICKET,
    description: payload.description,
  }),
);
const assign = jest.fn((ticketId: number, userId: number) => {
  const updatedTicket = storedTickets.find((t) => t.id === ticketId) as Ticket;
  return of({
    ...updatedTicket,
    assigneeId: userId,
  });
});
const complete = jest.fn((ticketId: number, completed: boolean) => {
  const updatedTicket = storedTickets.find((t) => t.id === ticketId) as Ticket;
  return of({
    ...updatedTicket,
    completed,
  });
});
const error = jest.fn(() => throwError(() => new Error('An error occured.')));

function getMockBackendServiceWithCustomErrors(
  usersErroredOut = false,
  ticketsErroredOut = false,
  newTicketErroredOut = false,
  assignErroredOut = false,
  completeErroredOut = false,
): MockBackendServiceType {
  return {
    users: usersErroredOut ? error : users,
    tickets: ticketsErroredOut ? error : tickets,
    newTicket: newTicketErroredOut ? error : newTicket,
    assign: assignErroredOut ? error : assign,
    complete: completeErroredOut ? error : complete,
  };
}

async function setup(
  mockBackendServiceWithCustomErrors?: MockBackendServiceType,
) {
  const mockBackendService: MockBackendServiceType =
    mockBackendServiceWithCustomErrors ?? {
      users,
      tickets,
      newTicket,
      assign,
      complete,
    };

  const { debugElement } = await render('', {
    providers: [
      { provide: BackendService, useValue: mockBackendService },
      provideComponentStore(TicketStore),
    ],
  });

  return {
    store: debugElement.injector.get(TicketStore),
    mockBackendService,
  };
}

describe('TicketStore', () => {
  describe('When init', () => {
    it('Then calls backend.users', async () => {
      const { mockBackendService } = await setup();

      expect(mockBackendService.users).toHaveBeenCalled();
      expect(mockBackendService.users).toHaveBeenCalledTimes(1);
    });

    it('Then calls backend.tickets', async () => {
      const { mockBackendService } = await setup();

      expect(mockBackendService.tickets).toHaveBeenCalled();
      //need to investigate why tickets is called twice
      expect(mockBackendService.tickets).toHaveBeenCalledTimes(2);
    });

    describe('Given all api returns success response', () => {
      it('Then tickets and users should be merged ', async () => {
        const { store } = await setup();

        const vm = await lastValueFrom(store.vm$.pipe(take(1)));

        expect(vm.tickets.length).toBe(3);
        expect(vm.tickets[0]).toEqual({
          ...storedTickets[0],
          assignee: storedUsers.find(
            (u) => u.id === storedTickets[0].assigneeId,
          )?.name,
        });
      });
    });

    describe('Given users api and tickets return failure responses', () => {
      it('Then tickets should not have any assignee and users should be empty', async () => {
        const backendService = getMockBackendServiceWithCustomErrors(
          true,
          true,
        );
        const { store } = await setup(backendService);

        const vm = await lastValueFrom(store.vm$.pipe(take(1)));

        expect(vm.tickets.length).toBe(0);
        expect(vm.users.length).toBe(0);
      });
    });

    describe('Given users api returns failure response', () => {
      it('Then tickets should not have any assignee', async () => {
        const backendService = getMockBackendServiceWithCustomErrors(true);
        const { store } = await setup(backendService);

        const vm = await lastValueFrom(store.vm$.pipe(take(1)));

        expect(vm.tickets.length).toBe(3);
        expect(vm.users.length).toBe(0);
        expect(vm.tickets[0]).toEqual({
          ...storedTickets[0],
        });
      });
    });

    describe('Given tickets api returns failure response', () => {
      it('Then tickets should be empty', async () => {
        const backendService = getMockBackendServiceWithCustomErrors(
          false,
          true,
        );
        const { store } = await setup(backendService);

        const vm = await lastValueFrom(store.vm$.pipe(take(1)));

        expect(vm.tickets.length).toBe(0);
        expect(vm.users.length).toBe(3);
        expect(vm.users).toEqual(storedUsers);
      });
    });

    describe('When adding a new ticket with success', () => {
      it('Then ticket is added to the list', async () => {
        const { store } = await setup();

        const description = 'new ticket';

        store.addTicket(description);

        const vm = await lastValueFrom(store.vm$.pipe(take(1)));

        expect(vm.tickets.length).toBe(4);
        expect(vm.tickets[vm.tickets.length - 1]).toEqual({
          ...NEW_TICKET,
          description,
          assignee: 'unassigned',
        });
      });
    });

    describe('When adding a new ticket errors out', () => {
      it('Then no ticket is added to the list', async () => {
        const backendService = getMockBackendServiceWithCustomErrors(
          false,
          false,
          true,
        );

        const { store } = await setup(backendService);

        const description = 'new ticket';

        store.addTicket(description);

        const vm = await lastValueFrom(store.vm$.pipe(take(1)));

        expect(vm.tickets.length).toBe(3);
        expect(vm.error).toEqual(new Error('An error occured.'));
        expect(vm.loading).toBeFalsy();
      });
    });

    describe('When assigning a user to a ticket with success', () => {
      it('Then ticket is updated with correct assignee', async () => {
        const { store } = await setup();

        const ticketId = storedTickets[0].id;
        const userId = storedUsers[0].id;
        const ticketToUpdateAssignee = storedTickets.find(
          (t) => t.id === ticketId,
        );
        const updatedAssignee = storedUsers.find((u) => u.id === userId);

        store.assignTicket({ userId, ticketId });

        const vm = await lastValueFrom(store.vm$.pipe(take(1)));

        expect(vm.tickets.length).toBe(3);
        expect(vm.tickets[0]).toEqual({
          ...ticketToUpdateAssignee,
          assigneeId: updatedAssignee?.id,
          assignee: updatedAssignee?.name,
        });
      });
    });

    describe('When assigning a user to a ticket errors out', () => {
      it('Then ticket is not updated with new assignee', async () => {
        const backendService = getMockBackendServiceWithCustomErrors(
          false,
          false,
          false,
          true,
        );
        const { store } = await setup(backendService);

        store.assignTicket({
          userId: storedUsers[0].id,
          ticketId: storedTickets[0].id,
        });

        const vm = await lastValueFrom(store.vm$.pipe(take(1)));

        expect(vm.tickets.length).toBe(3);
        expect(vm.tickets[0]).toEqual({
          ...storedTickets[0],
          assignee: storedUsers[0].name,
        });
      });
    });

    describe('When completing a ticket with success', () => {
      it('Then ticket is updated accordingly', async () => {
        const { store } = await setup();

        const ticketId = storedTickets[0].id;

        store.done(ticketId);

        const vm = await lastValueFrom(store.vm$.pipe(take(1)));

        expect(vm.tickets.length).toBe(3);
        expect(vm.tickets[0]).toEqual({
          ...storedTickets[0],
          completed: true,
          assignee: storedUsers[0].name,
        });
      });
    });

    describe('When completing a ticket errors out', () => {
      it('Then ticket is not updated', async () => {
        const backendService = getMockBackendServiceWithCustomErrors(
          false,
          false,
          false,
          false,
          true,
        );
        const { store } = await setup(backendService);

        const ticketId = storedTickets[0].id;

        store.done(ticketId);

        const vm = await lastValueFrom(store.vm$.pipe(take(1)));

        expect(vm.tickets.length).toBe(3);
        expect(vm.tickets[0]).toEqual({
          ...storedTickets[0],
          completed: false,
          assignee: storedUsers[0].name,
        });
      });
    });
  });
});
