import { userEvent } from '@testing-library/user-event';
import { render, screen } from '@testing-library/angular';
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
        },
      } as any,
    });

    return mockSend;
  };
  describe('Given an initualValue of 10', () => {
    test('Then counterValue is 10', async () => {
      await setup();
      expect(await screen.getByText('Counter: 10')).toBeInTheDocument();
    });

    describe('When clicking 5 times on increment button', () => {
      test('Then counterValue is 15', async () => {
        await setup();
        const incrementBtn = await screen.findByRole('button', {
          name: 'Increment',
        });
        await userEvent.click(incrementBtn);
        await userEvent.click(incrementBtn);
        await userEvent.click(incrementBtn);
        await userEvent.click(incrementBtn);
        await userEvent.click(incrementBtn);
        expect(await screen.getByText('Counter: 15')).toBeInTheDocument();
      });
    });

    describe('When clicking 2 times on decrement button', () => {
      let mockSend: jest.Mock<any, any, any>;
      beforeEach(async () => {
        mockSend = await setup();
        const decrementBtn = await screen.findByRole('button', {
          name: 'Decrement',
        });
        await userEvent.click(decrementBtn);
        await userEvent.click(decrementBtn);
      });
      test('Then counterValue is 8', async () => {
        expect(await screen.getByText('Counter: 8')).toBeInTheDocument();
      });
      describe('When clicking on Send ', () => {
        test('Then emitted value is 8', async () => {
          await userEvent.click(screen.getByRole('button', { name: 'Send' }));
          expect(mockSend).toBeCalledWith(8);
          expect(mockSend).toBeCalledTimes(1);
        });
      });
    });
  });
});
