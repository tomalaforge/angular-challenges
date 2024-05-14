import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  async function setup() {
    const user = userEvent.setup();
    const result = await render(AppComponent);
    return { ...result, user };
  }

  describe('When checking the checkbox', () => {
    it('Then button is enabled', async () => {
      // Arrange
      const { user, debugElement } = await setup();

      // logRoles(debugElement.nativeElement);
      // screen.debug(debugElement.nativeElement);
      // screen.logTestingPlaygroundURL();

      const checkbox = screen.getByRole('checkbox', { name: /agreed/i });

      // Act
      await user.click(checkbox);

      // Assert
      const button = screen.getByRole('button', { name: /submit/i });
      expect(button).toBeEnabled();
    });
  });
});
