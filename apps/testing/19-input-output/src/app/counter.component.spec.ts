import { EventEmitter } from '@angular/core';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { createSpyFromClass } from 'jest-auto-spies';
import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
  async function setup() {
    const sendSpy = createSpyFromClass(EventEmitter<number>);
    const result = await render(CounterComponent, {
      componentProperties: {
        initialValue: 10,
      },
      componentOutputs: {
        send: sendSpy,
      },
    });

    return { sendSpy, ...result };
  }

  describe('Given an initialValue of 10', () => {
    test('Then counterValue is 10', async () => {
      // Arrange
      await setup();

      // Act
      // Assert
      expect(screen.getByText('Counter: 10')).toBeTruthy();
    });

    describe('When clicking 5 times on increment button', () => {
      test('Then counterValue is 15', async () => {
        // Arrange
        await setup();
        const incrementBtn = screen.getByText('Increment');

        // Act
        await userEvent.click(incrementBtn);
        await userEvent.click(incrementBtn);
        await userEvent.click(incrementBtn);
        await userEvent.click(incrementBtn);
        await userEvent.click(incrementBtn);

        // Assert
        expect(screen.getByText('Counter: 15')).toBeTruthy();
      });
    });

    describe('When clicking 2 times on decrement button', () => {
      test('Then counterValue is 8', async () => {
        // Arrange
        await setup();
        const decrementBtn = screen.getByText('Decrement');

        // Act
        await userEvent.click(decrementBtn);
        await userEvent.click(decrementBtn);

        // Assert
        expect(screen.getByText('Counter: 8')).toBeTruthy();
      });

      describe('When clicking on Send ', () => {
        test('Then emitted value is 8', async () => {
          // Arrange
          const { sendSpy } = await setup();
          const decrementBtn = screen.getByText('Decrement');

          // Act
          await userEvent.click(decrementBtn);
          await userEvent.click(decrementBtn);
          await userEvent.click(screen.getByText('Send'));

          // Assert
          expect(sendSpy.emit).toHaveBeenCalledWith(8);
        });
      });
    });
  });
});
