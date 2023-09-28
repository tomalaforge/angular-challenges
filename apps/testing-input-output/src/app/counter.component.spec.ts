import { render, screen } from '@testing-library/angular';
import { CounterComponent } from './counter.component';
import userEvent from '@testing-library/user-event';

describe('CounterComponent', () => {
  describe('Given an initualValue of 10', () => {
    test('Then counterValue is 10', async () => {
      await render(CounterComponent, {
        componentProperties: { initialValue: 10 },
      });

      const counter = screen.getByTestId('counter');

      expect(counter).toHaveTextContent('Counter: 10');
    });

    describe('When clicking 5 times on increment button', () => {
      test('Then counterValue is 15', async () => {
        await render(CounterComponent, {
          componentProperties: { initialValue: 10 },
        });

        const counter = screen.getByTestId('counter');

        const button = screen.getAllByRole('button')[0]; //increment is first button

        // need to look up -> any way to do multiple clicks at once?
        await userEvent.click(button);
        await userEvent.click(button);
        await userEvent.click(button);
        await userEvent.click(button);
        await userEvent.click(button);

        expect(counter).toHaveTextContent('Counter: 15');
      });
    });

    describe('When clicking 2 times on decrement button', () => {
      test('Then counterValue is 8', async () => {
        await render(CounterComponent, {
          componentProperties: { initialValue: 10 },
        });

        const counter = screen.getByTestId('counter');

        const button = screen.getByText('Decrement');

        await userEvent.click(button);
        await userEvent.click(button);

        expect(counter).toHaveTextContent('Counter: 8');
      });

      describe('When clicking on Send ', () => {
        test('Then emitted value is 8', async () => {
          /*
          const mockSend = jest.fn();

          await render(CounterComponent, {
            componentProperties: { initialValue: 10, send: mockSend as any }, // this can't work because send.emit property ?
          })
 
          const counter = screen.getByTestId("counter");
 
          const button = screen.getByText("Decrement");
          const sendButton = screen.getByText("Send");
 
          await userEvent.click(button);
          await userEvent.click(button);
 
          expect(counter).toHaveTextContent('Counter: 8');

          await userEvent.click(sendButton);

          expect(mockSend).toHaveBeenCalledWith(8);    
          */

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
          const counter = screen.getByTestId('counter');

          const button = screen.getByText('Decrement');
          const sendButton = screen.getByText('Send');

          await userEvent.click(button);
          await userEvent.click(button);

          expect(counter).toHaveTextContent('Counter: 8');

          await userEvent.click(sendButton);

          expect(mockSend).toHaveBeenCalledWith(8);
        });
      });
    });
  });
});
