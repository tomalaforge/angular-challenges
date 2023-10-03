import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { AddComponent } from '../ui/add.component';

describe('AddComponent', () => {
  describe('When typing a description and clicking on add a new ticket', () => {
    describe('AddTicket event is emitted', () => {
      it('with the correct input value', async () => {
        const user = userEvent.setup();

        const mockAddTicket = jest.fn();

        await render(AddComponent, {
          componentInputs: {
            loading: false,
          },
          componentOutputs: {
            addTicket: {
              emit: mockAddTicket,
            } as any,
          },
        });

        const input = screen.getByRole('textbox');

        await user.type(input, 'New Ticket');

        const button = screen.getByRole('button');

        await user.click(button);

        expect(mockAddTicket).toHaveBeenCalledWith('New Ticket');
      });
    });

    describe('When no description and clicking on add a new ticket', () => {
      it('AddTicket event is not emitted & error message is displayed', async () => {
        const user = userEvent.setup();

        const mockAddTicket = jest.fn();

        await render(AddComponent, {
          componentInputs: {
            loading: false,
          },
          componentOutputs: {
            addTicket: {
              emit: mockAddTicket,
            } as any,
          },
        });

        const button = screen.getByRole('button');

        await user.click(button);

        expect(mockAddTicket).not.toHaveBeenCalled;

        const errorMsg = screen.getByTestId('error');

        expect(errorMsg).toBeVisible();

        // the strong tag prevents use of getByText
        // byRole is excellent for getting around nested tag problems
        // could use byRole and make error message a heading tag but
        // you can't use any tags other than span to wrap the element without breaking styling
        // tried to use a function in a getByText query but ran into typescript issues
        // another attempt at using a function resulted in multiple instances of the error being returned
        // didn't want to spend any more time debugging so I wrapped the errorMsg in a span tag with a testid
      });
    });
  });
});
