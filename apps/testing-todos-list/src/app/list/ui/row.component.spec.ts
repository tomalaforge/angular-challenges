import { Location } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { render } from '@testing-library/angular';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { APP_ROUTES } from '../../app.route';
import { RowComponent } from './row.component';

const USERS = [
  { id: 1, name: 'titi' },
  { id: 2, name: 'George' },
];
const TICKET_NOT_ASSIGNED = {
  id: 0,
  description: 'Install a monitor arm',
  assignee: 'unassigned',
  completed: false,
};

const TICKET_ASSIGNED = {
  id: 1,
  description: 'Install a monitor arm',
  assignee: 'titi',
  completed: false,
};

describe('RowComponent', () => {
  const setup = async ({ ticket = TICKET_NOT_ASSIGNED } = {}) => {
    const user = userEvent.setup();
    const assignMock = jest.fn();
    const closeTicketMock = jest.fn();

    await render(RowComponent, {
      routes: APP_ROUTES,
      componentInputs: {
        ticket,
        users: USERS,
      },
      componentOutputs: {
        assign: {
          emit: assignMock,
        },
        closeTicket: {
          emit: closeTicketMock,
        },
      } as any,
    });

    return { user, assignMock, closeTicketMock };
  };

  describe('Given an unassigned ticket', () => {
    describe('When we assign it to titi', () => {
      it('Then assign event is emitted with ticketId 0 and userId 1', async () => {
        const { user, assignMock } = await setup();

        const assignSelect = screen.getByRole('combobox', {
          name: /assign to/i,
        });

        await user.click(assignSelect);
        await user.click(screen.getByText(/george/i));

        await user.click(screen.getByRole('button', { name: /^assign$/i }));

        expect(assignMock).toHaveBeenCalledWith({ userId: 2, ticketId: 0 });
      });
    });
  });

  describe('Given an assigned ticket', () => {
    describe('When we click the done button', () => {
      it('Then closeTicket event is emitted with ticketId 1 ', async () => {
        const { user, closeTicketMock } = await setup({
          ticket: TICKET_ASSIGNED,
        });

        await user.click(screen.getByRole('button', { name: /^done$/i }));

        expect(closeTicketMock).toHaveBeenCalledWith(TICKET_ASSIGNED.id);
      });
    });
  });

  describe('When clicking on ticket', () => {
    it('Then navigation should be triggered with url detail/0', async () => {
      await setup();
      const location = TestBed.inject(Location);
      const rowButton = screen.getAllByRole('button')[0];
      await userEvent.click(rowButton);
      expect(location.path()).toEqual('/detail/0');
    });
  });
});
