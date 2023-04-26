import { fireEvent, render, screen } from '@testing-library/angular';
import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
  test('set input and listen to output', async () => {
    const initialValue = 4711;
    const sendValue = jest.fn();

    await render(CounterComponent, {
      componentProperties: {
        initialValue,
      },
      componentOutputs: {
        send: {
          emit: sendValue,
        } as any,
      },
    });

    const incrementControl = screen.getByRole('button', { name: /increment/i });
    const decrementControl = screen.getByRole('button', { name: /decrement/i });
    const sendControl = screen.getByRole('button', { name: /send/i });

    expect(screen.getByText(`Counter: ${initialValue}`)).toBeVisible();

    fireEvent.click(incrementControl);
    expect(screen.getByText(`Counter: ${initialValue + 1}`)).toBeVisible();

    fireEvent.click(decrementControl);
    fireEvent.click(decrementControl);
    expect(screen.getByText(`Counter: ${initialValue - 1}`)).toBeVisible();

    fireEvent.click(sendControl);
    expect(sendValue).toHaveBeenCalledWith(initialValue - 1);
  });
});
