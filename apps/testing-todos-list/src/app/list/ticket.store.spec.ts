import { render } from '@testing-library/angular';
import { createMockWithValues } from '@testing-library/angular/jest-utils';
import { of, take, throwError } from 'rxjs';
import { APP_ROUTES } from '../app.route';
import { BackendService } from '../backend.service';
import { ListComponent } from './list.component';
import { TicketStore } from './ticket.store';
import { provideComponentStore } from '@ngrx/component-store';
import { TestBed } from '@angular/core/testing';

const USERS = [
  { id: 1, name: 'titi' },
  { id: 2, name: 'george' },
];

const TICKETS = [
  {
    id: 0,
    description: 'Install a monitor arm',
    assigneeId: 1,
    completed: false,
  },
  {
    id: 1,
    description: 'Coucou',
    assigneeId: 1,
    completed: false,
  },
];

// TicketStore coverage is already good from list tests.  (I did the list tests before the store tests)
// Will these tests improve code coverage? No.
// Added Thomas' tests and only line 50 of Ticket Store gets covered from all these tests
// Wasted work?
// In a real project, it would be better to prioritize Backend Service tests first instead of extra tests of the store.
describe('TicketStore', () => {
  describe('When init', () => {
    it('Then calls backend.users and backend.tickets', async () => {
      // better to combine or have separate tests for each ?

      const { mockBackendService } = await setup();

      mockBackendService.users.mockReturnValue(of(USERS));
      mockBackendService.tickets.mockReturnValue(of(TICKETS));

      expect(mockBackendService.users).toHaveBeenCalled();
      expect(mockBackendService.tickets).toHaveBeenCalled();
    });

    describe('Given all api returns success response', () => {
      it('Then tickets and users should be merged ', async () => {
        //
      });
    });

    describe('Given users api returns failure response', () => {
      it('Then tickets should not have any assignee', async () => {
        // This is the test that will help with line 50 of ticket.store
        // increases branch coverage

        const { mockBackendService, store } = await setup();

        // already have store in the setup function
        // however, you could delete that and just use fixture

        // const store = fixture.debugElement.injector.get(TicketStore);

        // had to change my setup function since it was always mocked with users and tickets
        // each test would need mockBackendService.users & mockBackendService.tickets to be set manually

        mockBackendService.users.mockReturnValue(throwError(() => 'Error'));

        mockBackendService.tickets.mockReturnValue(of(TICKETS));

        // has async issues because of awaiting the setup so can't add done to the async function
        store.tickets$.pipe(take(1)).subscribe((tickets) => {
          expect(tickets[0]).toEqual({
            id: 0,
            description: 'Install a monitor arm',
            assigneeId: 1,
            completed: false,
          });
        });

        // store.tickets$ will return whatever you pass as the mockReturnValue
        // if the users api were to fail, I believe tickets would be an empty array
      });
    });

    describe('When adding a new ticket with success', () => {
      it('Then ticket is added to the list', async () => {
        //
      });
    });
  });
});

// best to just reuse this ?
const setup = async () => {
  const mockBackendService = createMockWithValues(BackendService, {
    users: jest.fn(),
    tickets: jest.fn(),
    newTicket: jest.fn(),
    assign: jest.fn(),
    complete: jest.fn(),
  });

  //mockBackendService.users.mockReturnValue(of(USERS));
  //mockBackendService.tickets.mockReturnValue(of(TICKETS));

  const fixture = await render(ListComponent, {
    routes: APP_ROUTES,
    providers: [
      provideComponentStore(TicketStore),
      { provide: BackendService, useValue: mockBackendService },
    ],
  });

  // have to add provideComponentStore because lifecycle methods are used in ticket store
  // would prefer to have ticket.store use constructor and not deal with injectors
  // const store = new Store(mockBackendService);

  // I didn't want to use TestBed but this seems easier

  const store = TestBed.inject(TicketStore);

  return { fixture, store, mockBackendService };
};
