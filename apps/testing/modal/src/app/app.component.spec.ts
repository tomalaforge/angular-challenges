import { userEvent } from '@testing-library/user-event';
import { render, screen } from '@testing-library/angular';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  test('After confirm button is clicked with no input a error modal should pop up', async () => {
    await render(AppComponent);
    const confirmBtn = await screen.getByRole('button', { name: /confirm/i });
    await userEvent.click(confirmBtn);
    await screen.findByRole('dialog');
    expect(
      await screen.getByRole('heading', {
        name: /error/i,
        level: 1,
      })
    ).toBeInTheDocument();

    const okBtn = await screen.getByRole('button', { name: /ok/i });
    await userEvent.click(okBtn);
  });

  describe('After entering input and click confirm button a profile modal should pop up', () => {
    beforeEach(async () => {
      await render(AppComponent);
      const input = await screen.getByRole('textbox');
      await userEvent.type(input, 'Testing');
      const confirmBtn = await screen.getByRole('button', { name: /confirm/i });
      await userEvent.click(confirmBtn);
      await screen.findByRole('dialog');
      expect(
        await screen.getByRole('heading', {
          name: /profil/i,
          level: 1,
        })
      ).toBeInTheDocument();
    });

    test('After clicking cancel there should be error message displayed in HTML', async () => {
      const cancelBtn = await screen.getByRole('button', { name: /cancel/i });
      await userEvent.click(cancelBtn);
      expect(
        await screen.queryByText('Name is invalid !!')
      ).toBeInTheDocument();
    });

    test('After clicking confirmation there should be success message displayed in HTML', async () => {
      const confirmationBtn = await screen.getByRole('button', {
        name: /confirmation/i,
      });
      await userEvent.click(confirmationBtn);
      expect(
        await screen.queryByText('Name has been submitted')
      ).toBeInTheDocument();
    });
  });
});
