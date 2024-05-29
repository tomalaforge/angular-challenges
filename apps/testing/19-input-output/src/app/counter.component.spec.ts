import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { AppComponent } from './app.component';
import { CounterComponent } from './counter.component';

async function setup() {
  const logMock = jest.fn((counter: number) => {
    console.log(counter);
  });

  await render(AppComponent, {
    imports: [CounterComponent],
    componentProperties: {
      log: logMock,
    },
  });

  const incrementButton = screen.getByRole('button', { name: /Increment/i });
  const decrementButton = screen.getByRole('button', { name: /Decrement/i });
  const sendButton = screen.getByRole('button', { name: /Send/i });
  const counterIncidator = screen.getByTestId('counter');

  return {
    logMock,
    incrementButton,
    decrementButton,
    sendButton,
    counterIncidator,
  };
}

describe('CounterComponent', () => {
  describe('Given an initualValue of 10', () => {
    test('Then counterValue is 10', async () => {
      const {
        logMock,
        incrementButton,
        decrementButton,
        sendButton,
        counterIncidator,
      } = await setup();

      expect(sendButton).toBeInTheDocument();
      expect(incrementButton).toBeInTheDocument();
      expect(decrementButton).toBeInTheDocument();
      expect(logMock).not.toHaveBeenCalled();
      expect(counterIncidator.textContent).toBe('Counter: 10');
    });

    test('After clicking send button the logged value should be 10', async () => {
      const { logMock, incrementButton, decrementButton, sendButton } =
        await setup();

      await userEvent.click(sendButton);

      expect(sendButton).toBeInTheDocument();
      expect(incrementButton).toBeInTheDocument();
      expect(decrementButton).toBeInTheDocument();
      expect(logMock).toHaveBeenCalled();
      expect(logMock).toHaveBeenCalledWith(10);
    });

    describe('When clicking 5 times on increment button', () => {
      test('Then counterValue is 15', async () => {
        const {
          logMock,
          sendButton,
          incrementButton,
          decrementButton,
          counterIncidator,
        } = await setup();

        for (let i = 0; i < 5; i++) {
          await userEvent.click(incrementButton);
        }

        expect(sendButton).toBeInTheDocument();
        expect(incrementButton).toBeInTheDocument();
        expect(decrementButton).toBeInTheDocument();
        expect(logMock).not.toHaveBeenCalled();
        expect(counterIncidator.textContent).toBe('Counter: 15');
      });
    });

    describe('When clicking 2 times on decrement button', () => {
      test('Then counterValue is 8', async () => {
        const {
          logMock,
          sendButton,
          incrementButton,
          decrementButton,
          counterIncidator,
        } = await setup();

        await userEvent.click(decrementButton);
        await userEvent.click(decrementButton);

        expect(sendButton).toBeInTheDocument();
        expect(incrementButton).toBeInTheDocument();
        expect(decrementButton).toBeInTheDocument();
        expect(logMock).not.toHaveBeenCalled();
        expect(counterIncidator.textContent).toBe('Counter: 8');
      });
      describe('When clicking on Send ', () => {
        test('Then emitted value is 8', async () => {
          const {
            logMock,
            sendButton,
            incrementButton,
            decrementButton,
            counterIncidator,
          } = await setup();

          await userEvent.click(decrementButton);
          await userEvent.click(decrementButton);

          await userEvent.click(sendButton);

          expect(sendButton).toBeInTheDocument();
          expect(incrementButton).toBeInTheDocument();
          expect(decrementButton).toBeInTheDocument();
          expect(logMock).toHaveBeenCalled();
          expect(logMock).toHaveBeenCalledTimes(1);
          expect(logMock).toHaveBeenCalledWith(8);
          expect(counterIncidator.textContent).toBe('Counter: 8');
        });
      });
    });
  });
});
