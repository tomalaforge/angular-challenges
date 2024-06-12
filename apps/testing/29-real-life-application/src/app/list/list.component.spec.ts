import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Location } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatSelectHarness } from '@angular/material/select/testing';
import { render, screen } from '@testing-library/angular';
import { createMock } from '@testing-library/angular/jest-utils';
import { within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { Observable, of, throwError } from 'rxjs';
import { APP_ROUTES } from '../app.route';
import { BackendService, Ticket, User } from '../backend.service';
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

const NEW_TICKET: Ticket = {
  id: 2,
  description: '',
  assigneeId: null,
  completed: false,
};

type MockBackendServiceType = {
  users: () => Observable<User[]>;
  tickets: () => Observable<Ticket[]>;
  newTicket: (payload: { description: string }) => Observable<Ticket>;
  assign: (ticketId: number, userId: number) => Observable<Ticket>;
  complete: (ticketId: number, completed: boolean) => Observable<Ticket>;
};

const mockBackendService: MockBackendServiceType = {
  users: () => of(USERS),
  tickets: () => of(TICKETS),
  newTicket: (payload: { description: string }) =>
    of({
      ...NEW_TICKET,
      description: payload.description,
    }),
  assign: (ticketId: number, userId: number) =>
    of({
      ...(TICKETS.find((t) => t.id === ticketId) as Ticket),
      assigneeId: userId,
    }),
  complete: (ticketId: number, completed: boolean) =>
    of({
      ...(TICKETS.find((t) => t.id === ticketId) as Ticket),
      completed,
    }),
};

async function setup(mckBackendService?: MockBackendServiceType) {
  const { fixture } = await render(ListComponent, {
    routes: APP_ROUTES,
    providers: [
      {
        provide: BackendService,
        useValue: mckBackendService ?? mockBackendService,
      },
    ],
  });

  const harnessLoader = TestbedHarnessEnvironment.loader(fixture);
  const searchInputHarness = await harnessLoader.getHarness(
    MatInputHarness.with({ selector: '#search-input' }),
  );
  const descriptionInputHarness = await harnessLoader.getHarness(
    MatInputHarness.with({ selector: '#description-input' }),
  );
  const addTicketButtonHarness = await harnessLoader.getHarness(
    MatButtonHarness.with({ selector: '#add-ticket-button' }),
  );
  const location = TestBed.inject(Location);

  return {
    harnessLoader,
    fixture,
    searchInputHarness,
    descriptionInputHarness,
    addTicketButtonHarness,
    location,
  };
}

describe('ListComponent', () => {
  describe('Create component', () => {
    it('Component should be initialized correctly', async () => {
      const { fixture } = await setup();

      expect(fixture.componentInstance).toBeTruthy();
    });
  });

  describe('Given "Install" inside the search input', () => {
    it('Then one row containing the searched text is visible', async () => {
      const { searchInputHarness } = await setup();

      await searchInputHarness.setValue('Install');

      const availableTickets = screen.queryAllByRole('listitem');

      expect(availableTickets.length).toBe(1);
      expect(availableTickets[0]).toBeInTheDocument();
      expect(availableTickets[0].innerHTML).toContain('Install a monitor arm');
      expect(availableTickets[0].innerHTML).not.toContain(
        'Move the desk to the new location',
      );
    });
  });

  describe('Given "Move the desk to" inside the search input', () => {
    it('Then one row containing the searched text is visible', async () => {
      const { searchInputHarness } = await setup();

      await searchInputHarness.setValue('Coucou');

      const availableTickets = screen.queryAllByRole('listitem');

      expect(availableTickets.length).toBe(1);
      expect(availableTickets[0]).toBeInTheDocument();
      expect(availableTickets[0].innerHTML).toContain('Coucou');
      expect(availableTickets[0].innerHTML).not.toContain(
        'Install a monitor arm',
      );
    });
  });

  describe('Given "Something else" inside the search input', () => {
    it('Then no rows are visible', async () => {
      const { searchInputHarness } = await setup();

      await searchInputHarness.setValue('Something else');

      const availableTickets = screen.queryAllByRole('listitem');

      expect(availableTickets.length).toBe(0);
    });
  });

  describe('When typing a description and clicking on add a new ticket', () => {
    describe('Given a success answer from API', () => {
      it('Then ticket with the description is added to the list with unassigned status', async () => {
        const { descriptionInputHarness, addTicketButtonHarness } =
          await setup(mockBackendService);

        await descriptionInputHarness.setValue('desc');
        await addTicketButtonHarness.click();

        const availableTickets = screen.queryAllByRole('listitem');

        const ticketButton = screen.getByTestId('ticket-button-2');
        const ticketDescription =
          within(ticketButton).getAllByTestId('ticket-description')[0];
        const ticketAssignee =
          within(ticketButton).getAllByTestId('ticket-assignee')[0];

        expect(availableTickets.length).toBe(3);
        expect(screen.getByTestId('ticket-button-2')).toBeInTheDocument();
        expect(ticketDescription.innerHTML).toEqual(
          '<span class="font-bold">Description:</span> desc ',
        );
        expect(ticketAssignee.innerHTML).toEqual(
          '<span class="font-bold">Assignee:</span> unassigned ',
        );
      });
    });

    describe('Given a failure answer from API', () => {
      it('Then an error is displayed at the bottom of the list', async () => {
        const errrorMessage = 'Error occured.';

        const backendService = createMock(BackendService);
        backendService.tickets = jest.fn(() => of(TICKETS));
        backendService.users = jest.fn(() => of(USERS));
        backendService.newTicket = jest.fn(() =>
          throwError(() => new Error(errrorMessage)),
        );

        const { descriptionInputHarness, addTicketButtonHarness } =
          await setup(backendService);

        await descriptionInputHarness.setValue('desc');
        await addTicketButtonHarness.click();

        const footer = screen.getByTestId('footer');
        expect(footer).toBeInTheDocument();
        expect(footer).toContainHTML(errrorMessage);
      });
    });
  });

  describe('When assigning first ticket to george', () => {
    describe('Given a success answer from API', () => {
      it('Then first ticket is assigned to George', async () => {
        const ticketToAssign = TICKETS[0];
        const userToAssignTicketTo = USERS[1];

        const { harnessLoader } = await setup();

        const mapSelectInputs = await harnessLoader.getAllHarnesses(
          MatSelectHarness.with(),
        );
        await mapSelectInputs[0].open();
        const optionHarnesses = await mapSelectInputs[0].getOptions();
        await optionHarnesses[1].click();

        const assignButtons = await harnessLoader.getAllHarnesses(
          MatButtonHarness.with({ text: 'Assign' }),
        );
        await assignButtons[0].click();

        const availableTickets = screen.queryAllByRole('listitem');

        const ticketButton = screen.getByTestId(
          `ticket-button-${ticketToAssign.id}`,
        );
        const ticketAssignee =
          within(ticketButton).getAllByTestId('ticket-assignee')[0];

        expect(mapSelectInputs.length).toBe(2);
        expect(optionHarnesses.length).toBe(2);
        expect(await optionHarnesses[1].getText()).toEqual(
          userToAssignTicketTo.name,
        );
        expect(assignButtons.length).toBe(2);
        expect(availableTickets.length).toBe(2);
        expect(
          screen.getByTestId(`ticket-button-${ticketToAssign.id}`),
        ).toBeInTheDocument();
        expect(ticketAssignee.innerHTML).toEqual(
          `<span class="font-bold">Assignee:</span> ${userToAssignTicketTo.name} `,
        );
      });
    });

    describe('Given a failure answer from API', () => {
      it('Then an error is displayed at the bottom of the list', async () => {
        const errrorMessage = 'Error occured.';

        const backendService = createMock(BackendService);
        backendService.tickets = jest.fn(() => of(TICKETS));
        backendService.users = jest.fn(() => of(USERS));
        backendService.assign = jest.fn(() =>
          throwError(() => new Error(errrorMessage)),
        );

        const { harnessLoader } = await setup(backendService);

        const mapSelectInputs = await harnessLoader.getAllHarnesses(
          MatSelectHarness.with(),
        );
        await mapSelectInputs[0].open();
        const optionHarnesses = await mapSelectInputs[0].getOptions();
        await optionHarnesses[1].click();

        const assignButtons = await harnessLoader.getAllHarnesses(
          MatButtonHarness.with({ text: 'Assign' }),
        );
        await assignButtons[0].click();

        const footer = screen.getByTestId('footer');
        expect(footer).toBeInTheDocument();
        expect(footer).toContainHTML(errrorMessage);
      });
    });
  });

  describe('When finishing first ticket', () => {
    describe('Given a success answer from API', () => {
      it('Then first ticket is done', async () => {
        const { harnessLoader } = await setup();

        const doneButtons = await harnessLoader.getAllHarnesses(
          MatButtonHarness.with({ text: 'Done' }),
        );
        await doneButtons[0].click();

        const availableTickets = screen.queryAllByRole('listitem');

        const ticketButton = screen.getByTestId(`ticket-button-0`);
        const ticketStatus =
          within(ticketButton).getAllByTestId('ticket-status')[0];

        expect(doneButtons.length).toBe(2);

        expect(availableTickets.length).toBe(2);
        expect(screen.getByTestId(`ticket-button-0`)).toBeInTheDocument();
        expect(ticketStatus.innerHTML).toEqual(
          `<span class="font-bold">Done:</span> true `,
        );
      });
    });

    describe('Given a failure answer from API', () => {
      it('Then an error is displayed at the bottom of the list', async () => {
        const errrorMessage = 'Error occured.';

        const backendService = createMock(BackendService);
        backendService.tickets = jest.fn(() => of(TICKETS));
        backendService.users = jest.fn(() => of(USERS));
        backendService.complete = jest.fn(() =>
          throwError(() => new Error(errrorMessage)),
        );

        const { harnessLoader } = await setup(backendService);

        const doneButtons = await harnessLoader.getAllHarnesses(
          MatButtonHarness.with({ text: 'Done' }),
        );
        await doneButtons[0].click();

        const footer = screen.getByTestId('footer');
        expect(footer).toBeInTheDocument();
        expect(footer).toContainHTML(errrorMessage);
      });
    });
  });

  describe('When clicking on first ticket', () => {
    it('Then we navigate to detail/0', async () => {
      const { location } = await setup();

      const availableTickets = screen.queryAllByRole('listitem');

      const ticketButtons = within(availableTickets[0]).getAllByRole('button');

      await userEvent.click(ticketButtons[0]);

      expect(location.path()).toEqual('/detail/0');
    });
  });
});
