import { fireEvent, render, screen } from '@testing-library/angular';
import { AppComponent } from './app.component';
import userEvent from '@testing-library/user-event';

describe('AppComponent', () => {
  describe('When checking the checkbox', () => {
    it('FireEvent', async () => {
      await render(AppComponent);

      const input = screen.getByLabelText('Agreed'); //screen.getByRole('checkbox');

      fireEvent.click(input);

      const submit = screen.getByRole('button', {
        name: 'Submit',
      }) as HTMLButtonElement;

      expect(submit.disabled).toBeFalsy();
    });

    it('UserEvent', async () => {
      const user = userEvent.setup();

      await render(AppComponent);

      const input = screen.getByLabelText('Agreed');
      const submit = screen.getByRole('button', {
        name: 'Submit',
      }) as HTMLButtonElement;

      await user.click(input);

      expect(submit.disabled).toBeFalsy();
    });

    it('UserEvent 2', async () => {
      const user = userEvent.setup();

      await render(AppComponent);

      const checkbox = screen.getByLabelText('Agreed');
      user.click(checkbox);
      const button = screen.getByRole('button', { name: 'Submit' });
      expect(button).toBeDisabled();
    });

    it('UserEvent 3', async () => {
      const user = userEvent.setup();

      await render(AppComponent);

      const checkbox = screen.getByLabelText('Agreed');
      await user.click(checkbox);
      expect(checkbox).toBeChecked();
    });
  });
});
