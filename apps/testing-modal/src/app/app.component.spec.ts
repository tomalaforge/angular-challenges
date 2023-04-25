import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  describe('When nothing has been typed inside the name input, and When clicking on Confirm', () => {
    test('Then display error modal', async () => {
      await render(AppComponent);

      const confirmButton = await screen.findByRole('button', {
        name: /confirm/i,
      });
      await userEvent.click(confirmButton);

      await screen.findByRole('dialog');
      screen.getByRole('heading', {
        name: /error/i,
        level: 1,
      });

      const okButton = screen.getByRole('button', {
        name: /ok/i,
      });
      await userEvent.click(okButton);
    });
  });

  describe('Given a name and When clicking on Confim', () => {
    const initTest = async () => {
      await render(AppComponent);

      const inputControl = screen.getByRole('textbox');
      await userEvent.type(inputControl, 'toto');

      const confirmButton = screen.getByRole('button', {
        name: /confirm/i,
      });
      await userEvent.click(confirmButton);

      await screen.findByRole('dialog');
    };

    test('Then display Profil modal', async () => {
      await initTest();

      screen.getByRole('heading', {
        name: /profil/i,
        level: 1,
      });
    });

    describe('When clicking on Cancel in the profile modal', () => {
      test('Then show "Name is invalid" error message', async () => {
        await initTest();

        const cancelButton = screen.getByRole('button', {
          name: /cancel/i,
        });
        await userEvent.click(cancelButton);

        await screen.findByText('Name is invalid !!');
      });
    });

    describe('When clicking on Confirm in the profile modal', () => {
      test('Then show "Name has been submitted" message', async () => {
        await initTest();

        const confirmDialogButton = screen.getByRole('button', {
          name: /confirm/i,
        });
        await userEvent.click(confirmDialogButton);

        await screen.findByText('Name has been submitted');
      });
    });
  });
});
