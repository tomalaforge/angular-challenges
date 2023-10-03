import { render } from '@testing-library/angular';
import { createMockWithValues } from '@testing-library/angular/jest-utils';
import { of } from 'rxjs';
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

      expect(mockBackendService.users).toHaveBeenCalled();
      expect(mockBackendService.tickets).toHaveBeenCalled();
    });

    describe('Given all api returns success response', () => {
      it('Then tickets and users should be merged ', async () => {
        //
      });
    });

    describe('Given users api returns failure response', () => {
      it('Then tickets should not have any assignee', () => {
        // I think this is the test that will help with line 50
        // Not really sure how I would test this as Thomas' solution has a more involved setup function
        // mockBackendService.users.and.returnValue(of(throwError()=> new Error("Blah blah blah"))) or something close
        // then check tickets are the same as TICKETS
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

  mockBackendService.users.mockReturnValue(of(USERS));
  mockBackendService.tickets.mockReturnValue(of(TICKETS));

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
