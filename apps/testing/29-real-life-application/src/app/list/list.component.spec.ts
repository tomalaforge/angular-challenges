import { Location } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { render, screen, within } from '@testing-library/angular';
import { createMockWithValues } from '@testing-library/angular/jest-utils';
import userEvent from '@testing-library/user-event';
import { of, throwError } from 'rxjs';
import { APP_ROUTES } from '../app.route';
import { BackendService, Ticket } from '../backend.service';
import { ListComponent } from './list.component';

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

describe('ListComponent', () => {
  async function setup() {
    // I would rather spy on the TicketStore than the BackendService, but the
    // need to assert on the behavior of the search input makes it difficult.
    const mockService = createMockWithValues(BackendService, {
      users: jest.fn(),
      tickets: jest.fn(),
    });
    mockService.users.mockReturnValueOnce(of(USERS));
    mockService.tickets.mockReturnValueOnce(of(TICKETS));
    const result = await render(ListComponent, {
      providers: [
        provideRouter(APP_ROUTES),
        { provide: BackendService, useValue: mockService },
      ],
    });

    return { ...result, mockService };
  }

  describe('Given Install inside the search input', () => {
    it('Then one row is visible', async () => {
      // Arrange
      await setup();
      expect((await screen.findAllByRole('listitem')).length).toBe(2);

      // Act
      await userEvent.type(
        screen.getByRole('textbox', { name: /search/i }),
        'Install',
      );

      // Assert
      expect(screen.getAllByRole('listitem').length).toBe(1);
    });
  });

  describe('When typing a description and clicking on add a new ticket', () => {
    describe('Given a success answer from API', () => {
      it('Then ticket with the description is added to the list with unassigned status', async () => {
        // Arrange
        const { mockService } = await setup();
        expect((await screen.findAllByRole('listitem')).length).toBe(2);
        const description = 'Foo';
        const newTicket: Ticket = {
          id: 3,
          description,
          assigneeId: null,
          completed: false,
        };
        mockService.newTicket.mockReturnValue(of(newTicket));

        // Act
        await userEvent.type(
          screen.getByRole('textbox', { name: /description/i }),
          description,
        );
        await userEvent.click(screen.getByRole('button', { name: /add/i }));

        // Assert
        expect(mockService.newTicket).toHaveBeenCalledWith({
          description: description,
        });
        expect(screen.getAllByRole('listitem').length).toBe(3);
        expect(screen.getByText(description)).toBeInTheDocument();
      });
    });

    describe('Given a failure answer from API', () => {
      it('Then an error is displayed at the bottom of the list', async () => {
        // Arrange
        const { mockService } = await setup();
        expect((await screen.findAllByRole('listitem')).length).toBe(2);
        const description = 'Foo';
        mockService.newTicket.mockReturnValue(throwError(() => 'Error'));

        // Act
        await userEvent.type(
          screen.getByRole('textbox', { name: /description/i }),
          description,
        );
        await userEvent.click(screen.getByRole('button', { name: /add/i }));

        // Assert
        expect(mockService.newTicket).toHaveBeenCalledWith({
          description: description,
        });
        expect(screen.getAllByRole('listitem').length).toBe(2);
        expect(screen.queryByText(description)).not.toBeInTheDocument();
      });
    });
  });

  describe('When assigning first ticket to george', () => {
    describe('Given a success answer from API', () => {
      it('Then first ticket is assigned to George', async () => {
        // Arrange
        const { mockService } = await setup();
        expect((await screen.findAllByRole('listitem')).length).toBe(2);
        mockService.assign.mockImplementation((ticketId, userId) =>
          of({
            ...TICKETS[0],
            id: ticketId,
            assigneeId: userId,
          }),
        );

        // Act
        const select = screen.getAllByRole('combobox')[0];
        await userEvent.click(select);
        await userEvent.click(screen.getByText(/george/i));
        await userEvent.click(
          screen.getAllByRole('button', { name: /^assign/i })[0],
        );

        // Assert
        expect(mockService.assign).toHaveBeenCalledWith(0, 2);
        within((await screen.findAllByRole('listitem'))[0]).getByText(
          /george/i,
        );
      });
    });

    describe('Given a failure answer from API', () => {
      it('Then an error is displayed at the bottom of the list', async () => {
        // Arrange
        const { mockService } = await setup();
        expect((await screen.findAllByRole('listitem')).length).toBe(2);
        mockService.assign.mockReturnValue(throwError(() => 'Error'));

        // Act
        const select = screen.getAllByRole('combobox')[0];
        await userEvent.click(select);
        await userEvent.click(screen.getByText(/george/i));
        await userEvent.click(
          screen.getAllByRole('button', { name: /^assign/i })[0],
        );

        // Assert
        expect(mockService.assign).toHaveBeenCalledWith(0, 2);
        within((await screen.findAllByRole('listitem'))[0]).getByText(/titi/i);
      });
    });
  });

  describe('When finishing first ticket', () => {
    describe('Given a success answer from API', () => {
      it('Then first ticket is done', async () => {
        // Arrange
        const { mockService } = await setup();
        expect((await screen.findAllByRole('listitem')).length).toBe(2);
        mockService.complete.mockImplementation((ticketId, completed) =>
          of({
            ...TICKETS[0],
            id: ticketId,
            completed,
          }),
        );

        // Act
        await userEvent.click(
          screen.getAllByRole('button', { name: /^done/i })[0],
        );

        // Assert
        expect(mockService.complete).toHaveBeenCalledWith(0, true);
        within((await screen.findAllByRole('listitem'))[0]).getByText(/true/i);
      });
    });

    describe('Given a failure answer from API', () => {
      it('Then an error is displayed at the bottom of the list', async () => {
        // Arrange
        const { mockService } = await setup();
        expect((await screen.findAllByRole('listitem')).length).toBe(2);
        mockService.complete.mockReturnValue(throwError(() => 'Error'));

        // Act
        await userEvent.click(
          screen.getAllByRole('button', { name: /^done/i })[0],
        );

        // Assert
        expect(mockService.complete).toHaveBeenCalledWith(0, true);
        within((await screen.findAllByRole('listitem'))[0]).getByText(/false/i);
      });
    });
  });

  describe('When clicking on first ticket', () => {
    it('Then we navigate to detail/0', async () => {
      // Arrange
      await setup();
      expect((await screen.findAllByRole('listitem')).length).toBe(2);
      const location = TestBed.inject(Location);

      // Act
      await userEvent.click(
        screen.getAllByRole('button', { name: /^ticket/i })[0],
      );

      // Assert
      expect(location.path()).toBe('/detail/0');
    });
  });
});
