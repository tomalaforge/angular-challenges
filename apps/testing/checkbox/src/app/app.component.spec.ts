import { render, screen } from '@testing-library/angular';
import { AppComponent } from './app.component';
import userEvent from '@testing-library/user-event';

describe('AppComponent', () => {
  const setup = async () => {
    const user = userEvent.setup();
    const result = await render(AppComponent);
    return { result, user };
  };

  describe('When checking the checkbox', () => {
    it('Then button is enabled', async () => {
      const { user } = await setup();
      const checkbox = await screen.getByLabelText('Agreed');
      await user.click(checkbox);
      const submitBtn = await screen.getByRole('button', { name: 'Submit' });
      expect(submitBtn).toBeEnabled();
    });
  });
});
