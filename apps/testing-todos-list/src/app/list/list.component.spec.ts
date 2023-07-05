import { Location } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { render, screen } from '@testing-library/angular';
import { createMockWithValues } from '@testing-library/angular/jest-utils';
import { within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { of, throwError } from 'rxjs';
import { APP_ROUTES } from '../app.route';
import { BackendService } from '../backend.service';
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
  const setup = async () => {
    const user = userEvent.setup();

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
      providers: [{ provide: BackendService, useValue: mockBackendService }],
    });

    return { fixture, mockBackendService, user };
  };

  describe('Given Install inside the search input', () => {
    it('Then one row is visible', async () => {
      const { user } = await setup();

      let rows = await screen.findAllByRole('listitem');

      expect(rows.length).toEqual(2);

      const searchInput = screen.getByLabelText('Search');
      await user.clear(searchInput);
      await user.type(searchInput, 'Install');

      rows = await screen.findAllByRole('listitem');
      expect(rows.length).toEqual(1);
    });
  });

  describe('When typing a description and clicking on add a new ticket', () => {
    describe('Given a success answer from API', () => {
      it('Then ticket with the description is added to the list with unassigned status', async () => {
        const { mockBackendService, user } = await setup();
        mockBackendService.newTicket.mockImplementation(({ description }) =>
          of({
            id: 3,
            description,
            assigneeId: null,
            completed: false,
          })
        );

        let rows = await screen.findAllByRole('listitem');

        expect(rows.length).toEqual(2);

        const description = screen.getByPlaceholderText(/My new task/i);
        await user.clear(description);
        await user.type(description, 'new Task');

        const addButton = screen.getByRole('button', {
          name: /add new ticket/i,
        });
        await user.click(addButton);

        await screen.findByText(/new task/i);

        rows = await screen.findAllByRole('listitem');
        expect(rows.length).toEqual(3);
      });
    });

    describe('Given a failure answer from API', () => {
      it('Then an error is displayed at the bottom of the list', async () => {
        const { mockBackendService, user } = await setup();
        mockBackendService.newTicket.mockReturnValue(
          throwError(() => 'ticket creation failed')
        );

        let rows = await screen.findAllByRole('listitem');

        expect(rows.length).toEqual(2);

        const description = screen.getByPlaceholderText(/My new task/i);
        await user.clear(description);
        await user.type(description, 'new Task');

        const addButton = screen.getByRole('button', {
          name: /add new ticket/i,
        });
        await user.click(addButton);

        await screen.findByText(/ticket creation failed/i);

        rows = await screen.findAllByRole('listitem');
        expect(rows.length).toEqual(2);
      });
    });
  });

  describe('When assigning first ticket to george', () => {
    describe('Given a success answer from API', () => {
      it('Then first ticket is assigned to George', async () => {
        const { mockBackendService, user } = await setup();
        mockBackendService.assign.mockImplementation((ticketId, userId) =>
          of({
            ...TICKETS[0],
            id: ticketId,
            assigneeId: userId,
          })
        );

        let rows = await screen.findAllByRole('listitem');

        const assignSelect = within(rows[0]).getByRole('combobox', {
          name: /assign to/i,
        });

        await user.click(assignSelect);
        await user.click(screen.getByText(/george/i));

        await user.click(
          within(rows[0]).getByRole('button', { name: /^assign$/i })
        );

        rows = await screen.findAllByRole('listitem');
        within(rows[0]).getByText(/george/i);
      });
    });

    describe('Given a failure answer from API', () => {
      it('Then an error is displayed at the bottom of the list', async () => {
        const { mockBackendService, user } = await setup();
        mockBackendService.assign.mockReturnValue(
          throwError(() => 'ticket assignement failed')
        );

        let rows = await screen.findAllByRole('listitem');

        const assignSelect = within(rows[0]).getByRole('combobox', {
          name: /assign to/i,
        });

        await user.click(assignSelect);
        await user.click(screen.getByText(/george/i));

        await user.click(
          within(rows[0]).getByRole('button', { name: /^assign$/i })
        );

        await screen.findByText(/ticket assignement failed/i);

        rows = await screen.findAllByRole('listitem');
        within(rows[0]).getByText(/titi/i);
      });
    });
  });

  describe('When finishing first ticket', () => {
    describe('Given a success answer from API', () => {
      it('Then first ticket is done', async () => {
        const { mockBackendService, user } = await setup();
        mockBackendService.complete.mockImplementation((ticketId, completed) =>
          of({
            ...TICKETS[0],
            id: ticketId,
            completed,
          })
        );
        let rows = await screen.findAllByRole('listitem');

        await user.click(
          within(rows[0]).getByRole('button', { name: /^done$/i })
        );

        rows = await screen.findAllByRole('listitem');
        within(rows[0]).getByText(/true/i);

        expect(rows[0]).toHaveClass('bg-green-200');
      });
    });

    describe('Given a failure answer from API', () => {
      it('Then an error is displayed at the bottom of the list', async () => {
        const { mockBackendService, user } = await setup();
        mockBackendService.complete.mockReturnValue(
          throwError(() => 'ticket complete failed')
        );

        let rows = await screen.findAllByRole('listitem');

        await user.click(
          within(rows[0]).getByRole('button', { name: /^done$/i })
        );

        await screen.findByText(/ticket complete failed/i);

        rows = await screen.findAllByRole('listitem');
        expect(within(rows[0]).queryByText(/true/i)).not.toBeInTheDocument();

        expect(rows[0]).not.toHaveClass('bg-green-200');
      });
    });
  });

  describe('When clicking on first ticket', () => {
    it('Then we navigate to detail/0', async () => {
      await setup();
      const location = TestBed.inject(Location);
      const row1 = (await screen.findAllByRole('listitem'))[0];
      const rowButton = within(row1).getAllByRole('button')[0];
      await userEvent.click(rowButton);
      expect(location.path()).toEqual('/detail/0');
    });
  });
});
