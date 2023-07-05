import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  const setup = async () => {
    const user = userEvent.setup();
    const result = await render(AppComponent);
    return { result, user };
  };

  describe('When checking the checkbox', () => {
    it('Then button is enabled', async () => {
      const { user } = await setup();

      const checkbox = screen.getByLabelText('Agreed');
      user.click(checkbox);
      const button = screen.getByRole('button', { name: 'Submit' });
      expect(button).toBeDisabled();
    });
  });
});
