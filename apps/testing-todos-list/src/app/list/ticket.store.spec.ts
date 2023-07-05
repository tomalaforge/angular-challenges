import { provideComponentStore } from '@ngrx/component-store';
import { render } from '@testing-library/angular';
import { createMockWithValues } from '@testing-library/angular/jest-utils';
import { lastValueFrom, of, take, throwError } from 'rxjs';
import { BackendService, Ticket, User } from '../backend.service';
import { TicketStore } from './ticket.store';

interface RenderOptions {
  users: User[];
  tickets: Ticket[];
  userStatus: 'success' | 'failure';
}

const ASSIGNE_1 = 'Titi';
const USERS = [{ id: 1, name: ASSIGNE_1 }];
const TICKETS = [
  {
    id: 0,
    description: 'Install a monitor arm',
    assigneeId: 1,
    completed: false,
  },
];

describe('TicketStore', () => {
  const setup = async ({
    users = USERS,
    tickets = TICKETS,
    userStatus = 'success',
  }: Partial<RenderOptions> = {}) => {
    const mockBackendService = createMockWithValues(BackendService, {
      users: jest.fn(),
      tickets: jest.fn(),
      newTicket: jest.fn(),
    });

    mockBackendService.tickets.mockReturnValue(of(tickets));

    if (userStatus === 'success') {
      mockBackendService.users.mockReturnValue(of(users));
    } else if (userStatus === 'failure') {
      mockBackendService.users.mockReturnValue(
        throwError(() => 'users failure')
      );
    }

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
  };

  describe('When init', () => {
    it('Then calls backend.users', async () => {
      const { mockBackendService } = await setup();

      expect(mockBackendService.users).toHaveBeenCalled();
    });

    it('Then calls backend.tickets', async () => {
      const { mockBackendService } = await setup();

      expect(mockBackendService.tickets).toHaveBeenCalled();
    });

    describe('Given all api returns success response', () => {
      it('Then tickets and users should be merged ', async () => {
        const { store } = await setup();

        const tickets = await lastValueFrom(store.tickets$.pipe(take(1)));

        expect(tickets[0]).toEqual({
          id: 0,
          description: 'Install a monitor arm',
          assignee: ASSIGNE_1,
          assigneeId: 1,
          completed: false,
        });
      });
    });

    describe('Given users api returns failure response', () => {
      it('Then tickets should not have any assignee', (done) => {
        setup({ userStatus: 'failure' }).then(({ store }) => {
          store.tickets$.pipe(take(1)).subscribe((tickets) => {
            expect(tickets[0]).toEqual({
              id: 0,
              description: 'Install a monitor arm',
              assigneeId: 1,
              completed: false,
            });
            done();
          });
        });
      });
    });

    describe('When adding a new ticket with success', () => {
      it('Then ticket is added to the list', async () => {
        const NEW_TICKET = {
          id: 1,
          description: 'test 2',
          assigneeId: 888,
          completed: false,
        };

        const { store, mockBackendService } = await setup();
        mockBackendService.newTicket.mockReturnValue(of(NEW_TICKET));

        store.addTicket(NEW_TICKET.description);

        const state = await lastValueFrom(store.state$.pipe(take(1)));

        expect(mockBackendService.newTicket).toHaveBeenCalled();
        expect(state.loading).toEqual(false);
        expect(state.tickets.length).toEqual(2);
        expect(state.tickets[1]).toEqual(NEW_TICKET);
      });
    });
  });
});
