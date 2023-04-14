import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
  const setup = async () => {
    const mockSend = jest.fn();

    await render(CounterComponent, {
      componentInputs: {
        initialValue: 10,
      },
      componentOutputs: {
        send: {
          emit: mockSend,
        } as any,
      },
    });

    return mockSend;
  };

  describe('Given an initualValue of 10', () => {
    test('Then counterValue is 10', async () => {
      await setup();
      screen.findByText(/counter: 10/i);
    });

    describe('When clicking 5 times on increment button', () => {
      test('Then counterValue is 15', async () => {
        await setup();

        const incrementButton = screen.getByRole('button', {
          name: /increment/i,
        });

        userEvent.click(incrementButton);
        userEvent.click(incrementButton);
        userEvent.click(incrementButton);
        userEvent.click(incrementButton);
        userEvent.click(incrementButton);

        screen.findByText(/counter: 15/i);
      });
    });

    describe('When clicking 2 times on decrement button', () => {
      test('Then counterValue is 8', async () => {
        await setup();

        const decrementButton = screen.getByRole('button', {
          name: /decrement/i,
        });

        userEvent.click(decrementButton);
        userEvent.click(decrementButton);

        screen.findByText(/counter: 8/i);
      });
      describe('When clicking on Send ', () => {
        test('Then emitted value is 8', async () => {
          const mockSend = await setup();

          const decrementButton = screen.getByRole('button', {
            name: /decrement/i,
          });

          userEvent.click(decrementButton);
          userEvent.click(decrementButton);

          screen.findByText(/counter: 8/i);

          await userEvent.click(screen.getByRole('button', { name: /send/i }));
          expect(mockSend).toHaveBeenCalledTimes(1);
          expect(mockSend).toHaveBeenCalledWith(8);
        });
      });
    });
  });
});
