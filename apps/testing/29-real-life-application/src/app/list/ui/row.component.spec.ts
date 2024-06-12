import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Location } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatSelectHarness } from '@angular/material/select/testing';
import { render, screen, within } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { APP_ROUTES } from '../../app.route';
import { TicketUser } from '../../backend.service';
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

async function setup(ticketInput?: TicketUser) {
  const assignEvent = jest.fn();
  const closeTicketEvent = jest.fn();

  const { fixture } = await render(RowComponent, {
    routes: APP_ROUTES,
    componentInputs: {
      ticket: ticketInput ?? TICKET_NOT_ASSIGNED,
      users: USERS,
    },
    componentOutputs: {
      assign: {
        emit: assignEvent,
      } as any,
      closeTicket: {
        emit: closeTicketEvent,
      } as any,
    },
  });

  const harnessLoader = TestbedHarnessEnvironment.loader(fixture);
  const location = TestBed.inject(Location);

  return {
    harnessLoader,
    fixture,
    assignEvent,
    closeTicketEvent,
    location,
  };
}

describe('RowComponent', () => {
  describe('Given an unassigned ticket', () => {
    describe('When we assign it to titi', () => {
      it('Then assign event is emitted with ticketId 0 and userId 1', async () => {
        const { harnessLoader, assignEvent } = await setup();

        const mapSelectInput = await harnessLoader.getHarness(
          MatSelectHarness.with(),
        );

        await mapSelectInput.open();

        const optionHarnesses = await mapSelectInput.getOptions();

        await optionHarnesses[0].click();

        const assignButton = await harnessLoader.getHarness(
          MatButtonHarness.with({ text: 'Assign' }),
        );
        await assignButton.click();

        expect(await optionHarnesses[0].getText()).toEqual(USERS[0].name);
        expect(assignEvent).toHaveBeenCalledTimes(1);
        expect(assignEvent).toHaveBeenCalledWith({
          ticketId: TICKET_NOT_ASSIGNED.id,
          userId: USERS[0].id,
        });
      });
    });
  });

  describe('Given an assigned ticket', () => {
    describe('When we click the done button', () => {
      it('Then closeTicket event is emitted with ticketId 1 ', async () => {
        const { harnessLoader, closeTicketEvent } =
          await setup(TICKET_ASSIGNED);

        const doneButton = await harnessLoader.getHarness(
          MatButtonHarness.with({ text: 'Done' }),
        );
        await doneButton.click();

        expect(closeTicketEvent).toHaveBeenCalledTimes(1);
        expect(closeTicketEvent).toHaveBeenCalledWith(TICKET_ASSIGNED.id);
      });
    });
  });

  describe('When clicking on ticket', () => {
    it('Then navigation should be triggered with url detail/0', async () => {
      const { location } = await setup();

      const availableTickets = screen.queryAllByRole('listitem');

      const ticketButtons = within(availableTickets[0]).getAllByRole('button');

      await userEvent.click(ticketButtons[0]);

      expect(location.path()).toEqual('/detail/0');
    });
  });

  describe('When clicking on ticket with id 1', () => {
    it('Then navigation should be triggered with url detail/1', async () => {
      const { location } = await setup(TICKET_ASSIGNED);

      const availableTickets = screen.queryAllByRole('listitem');

      const ticketButtons = within(availableTickets[0]).getAllByRole('button');

      await userEvent.click(ticketButtons[0]);

      expect(location.path()).toEqual(`/detail/${TICKET_ASSIGNED.id}`);
    });
  });
});
