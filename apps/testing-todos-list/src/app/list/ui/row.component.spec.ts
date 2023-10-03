import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { RowComponent } from './row.component';
import { APP_ROUTES } from '../../app.route';
import { TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';

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
  describe('Given an unassigned ticket', () => {
    describe('When we assign it to titi', () => {
      it('Then assign event is emitted with ticketId 0 and userId 1', async () => {
        const user = userEvent.setup();

        const mockAssign = jest.fn();
        const mockCloseTicket = jest.fn();

        await render(RowComponent, {
          componentInputs: {
            ticket: TICKET_NOT_ASSIGNED,
            users: USERS,
          },
          componentOutputs: {
            assign: {
              emit: mockAssign,
            } as any,
            closeTicket: {
              emit: mockCloseTicket,
            } as any,
          },
        });

        await userEvent.click(screen.getByRole('combobox'));

        // options don't appear until you click the select

        expect(screen.getByText('titi')).toBeInTheDocument();

        expect(screen.getByText('George')).toBeInTheDocument();

        const assignBtn = screen.getByRole('button', { name: 'Assign' });

        //await user.selectOptions(screen.getByRole('combobox'), 'titi');  // doesn't work

        await user.click(screen.getByText('titi'));

        await user.click(assignBtn);

        expect(mockAssign).toHaveBeenCalledWith({ ticketId: 0, userId: 1 });
      });
    });
  });

  // after first test -> code coverage is 100%

  describe('Given an assigned ticket', () => {
    describe('When we click the done button', () => {
      it('Then closeTicket event is emitted with ticketId 1 ', async () => {
        const user = userEvent.setup();

        const mockAssign = jest.fn();
        const mockCloseTicket = jest.fn();

        await render(RowComponent, {
          componentInputs: {
            ticket: TICKET_ASSIGNED,
            users: USERS,
          },
          componentOutputs: {
            assign: {
              emit: mockAssign,
            } as any,
            closeTicket: {
              emit: mockCloseTicket,
            } as any,
          },
        });

        const doneButton = screen.getByRole('button', { name: 'Done' });

        await user.click(doneButton);

        expect(mockCloseTicket).toHaveBeenCalledWith(1);
      });
    });
  });

  describe('When clicking on ticket', () => {
    it('Then navigation should be triggered with url detail/0', async () => {
      // Without this test, the detail component is missing from the code coverage report

      // this navigate button wrapper caused some of my previous test attempts to fail
      // Skipping this test til later did affect my recognition of some other test failures

      const mockAssign = jest.fn();
      const mockCloseTicket = jest.fn();

      const user = userEvent.setup();

      await render(RowComponent, {
        routes: APP_ROUTES,
        componentInputs: {
          ticket: TICKET_NOT_ASSIGNED, // id is 0 & using TICKET_ASSIGNED, id is 1
          users: USERS,
        },
        componentOutputs: {
          assign: {
            emit: mockAssign,
          } as any,
          closeTicket: {
            emit: mockCloseTicket,
          } as any,
        },
      });

      const location = TestBed.inject(Location);
      const rowButton = screen.getAllByRole('button')[0];

      await user.click(rowButton);
      expect(location.path()).toEqual('/detail/0');
    });
  });
});
