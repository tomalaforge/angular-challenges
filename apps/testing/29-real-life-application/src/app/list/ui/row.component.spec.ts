import { Location } from '@angular/common';
import { EventEmitter } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { createSpyFromClass } from 'jest-auto-spies';
import { APP_ROUTES } from '../../app.route';
import { Ticket, TicketUser, User } from '../../backend.service';
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
  async function setup({
    users = USERS,
    ticket,
  }: {
    users?: User[];
    ticket?: TicketUser | Ticket;
  }) {
    const assignSpy = createSpyFromClass(
      EventEmitter<{ userId: number; ticketId: number }>,
    );
    const closeTicketSpy = createSpyFromClass(EventEmitter<number>);
    const result = await render(RowComponent, {
      componentProperties: {
        ticket,
        users,
      },
      componentOutputs: {
        assign: assignSpy,
        closeTicket: closeTicketSpy,
      },
      routes: APP_ROUTES,
    });

    return { assignSpy, closeTicketSpy, ...result };
  }

  describe('Given an unassigned ticket', () => {
    describe('When we assign it to titi', () => {
      it('Then assign event is emitted with ticketId 0 and userId 1', async () => {
        // Arrange
        const { assignSpy, closeTicketSpy } = await setup({
          ticket: TICKET_NOT_ASSIGNED,
        });
        const select = screen.getByRole('combobox');

        // Act
        await userEvent.click(select);
        await userEvent.click(screen.getByText('titi'));
        await userEvent.click(screen.getByRole('button', { name: /^assign/i }));

        // Assert
        expect(assignSpy.emit).toHaveBeenCalledWith({ userId: 1, ticketId: 0 });
        expect(closeTicketSpy.emit).not.toHaveBeenCalled();
      });
    });
  });

  describe('Given an assigned ticket', () => {
    describe('When we click the done button', () => {
      it('Then closeTicket event is emitted with ticketId 1 ', async () => {
        // Arrange
        const { assignSpy, closeTicketSpy } = await setup({
          ticket: TICKET_ASSIGNED,
        });

        // Act
        await userEvent.click(screen.getByRole('button', { name: /^done/i }));

        // Assert
        expect(closeTicketSpy.emit).toHaveBeenCalledWith(1);
        expect(assignSpy.emit).not.toHaveBeenCalled();
      });
    });
  });

  describe('When clicking on ticket', () => {
    it('Then navigation should be triggered with url detail/0', async () => {
      // Arrange
      const { assignSpy, closeTicketSpy } = await setup({
        ticket: TICKET_NOT_ASSIGNED,
      });
      const location = TestBed.inject(Location);

      // Act
      await userEvent.click(screen.getByRole('button', { name: /^ticket/i }));

      // Assert
      expect(location.path()).toBe('/detail/0');
      expect(closeTicketSpy.emit).not.toHaveBeenCalled();
      expect(assignSpy.emit).not.toHaveBeenCalled();
    });
  });
});
