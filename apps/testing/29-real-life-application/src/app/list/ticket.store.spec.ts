import { TestBed } from '@angular/core/testing';
import { provideComponentStore } from '@ngrx/component-store';
import { createMockWithValues } from '@testing-library/angular/jest-utils';
import { lastValueFrom, of, take, throwError } from 'rxjs';
import { BackendService } from '../backend.service';
import { TicketStore } from './ticket.store';

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

describe('TicketStore', () => {
  describe('When init', () => {
    function setup({ userSuccess = true }: { userSuccess?: boolean } = {}) {
      const mockService = createMockWithValues(BackendService, {
        users: jest.fn(),
        tickets: jest.fn(),
      });
      if (userSuccess) {
        mockService.users.mockReturnValueOnce(of(USERS));
      } else {
        mockService.users.mockReturnValueOnce(throwError(() => 'oops'));
      }
      mockService.tickets.mockReturnValueOnce(of(TICKETS));

      TestBed.configureTestingModule({
        providers: [
          provideComponentStore(TicketStore),
          {
            provide: BackendService,
            useValue: mockService,
          },
        ],
      });

      const store = TestBed.inject(TicketStore);

      return { store, mockService };
    }

    it('Then calls backend.users', async () => {
      // Arrange
      const { mockService } = setup();

      // Act

      // Assert
      expect(mockService.users).toHaveBeenCalled();
    });

    it('Then calls backend.tickets', async () => {
      // Arrange
      const { mockService } = setup();

      // Act

      // Assert
      expect(mockService.tickets).toHaveBeenCalled();
    });

    describe('Given all api returns success response', () => {
      it('Then tickets and users should be merged ', async () => {
        // Arrange
        const { store } = setup();

        // Act
        const result = await lastValueFrom(store.tickets$.pipe(take(1)));

        // Assert
        expect(result).toEqual(
          TICKETS.map((ticket) => {
            return {
              ...ticket,
              assignee: 'titi',
            };
          }),
        );
      });
    });

    describe('Given users api returns failure response', () => {
      it('Then tickets should not have any assignee', async () => {
        // Arrange
        const { store } = setup({ userSuccess: false });

        // Act
        const result = await lastValueFrom(store.tickets$.pipe(take(1)));

        // Assert
        expect(result).toEqual(TICKETS);
      });
    });

    describe('When adding a new ticket with success', () => {
      it('Then ticket is added to the list', async () => {
        // Arrange
        const { store, mockService } = setup();
        const description = 'new ticket';
        mockService.newTicket.mockReturnValueOnce(of({ id: 2, description }));

        // Act
        store.addTicket(description);

        // Assert
        expect(mockService.newTicket).toHaveBeenCalledWith({ description });
        const result = await lastValueFrom(store.tickets$.pipe(take(1)));
        expect(result).toEqual([
          ...TICKETS.map((ticket) => {
            return {
              ...ticket,
              assignee: 'titi',
            };
          }),
          {
            id: 2,
            description,
            assignee: 'unassigned',
          },
        ]);
      });
    });
  });
});
