import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { AppComponent } from './app.component';

async function setup() {
  await render(AppComponent);

  const confirmButton = screen.getByRole('button', { name: /Confirm/i });
  const nameInputControl = screen.getByRole('textbox');

  return { confirmButton, nameInputControl };
}

describe('AppComponent', () => {
  test('error modal is displayed if you click on "Confirm" without inputing a name', async () => {
    const { confirmButton } = await setup();

    expect(
      screen.queryByRole('heading', { name: /Error/i }),
    ).not.toBeInTheDocument();

    await userEvent.click(confirmButton);

    expect(confirmButton).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: /Error/i }),
    ).toBeInTheDocument();
  });

  test('should show confirmation modal and not error modal after typing a name and clicking "Confirm"', async () => {
    const { confirmButton, nameInputControl } = await setup();

    expect(
      screen.queryByRole('heading', { name: /Error/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: /Profil/i }),
    ).not.toBeInTheDocument();

    await userEvent.type(nameInputControl, 'my name');
    await userEvent.click(confirmButton);

    expect(confirmButton).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: /Error/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: /Profil/i }),
    ).toBeInTheDocument();
  });

  test('error message is shown if you click "Cancel" in the confirmation modal after submitting a name', async () => {
    const { confirmButton, nameInputControl } = await setup();

    await userEvent.type(nameInputControl, 'my name');
    await userEvent.click(confirmButton);

    const cancelModalButton = screen.getByRole('button', { name: /Cancel/i });
    const confirmModalButton = screen.getByRole('button', {
      name: /Confirmation/i,
    });
    expect(cancelModalButton).toBeInTheDocument();
    expect(confirmModalButton).toBeInTheDocument();

    await userEvent.click(cancelModalButton);

    const invalidNameElement = screen.getByText('Name is invalid !!');

    expect(invalidNameElement).toBeInTheDocument();
    expect(cancelModalButton).not.toBeInTheDocument();
    expect(confirmModalButton).not.toBeInTheDocument();
  });

  test('confirm message is shown if you click "Confirm" in the confirmation modal after submitting a name', async () => {
    const { confirmButton, nameInputControl } = await setup();

    await userEvent.type(nameInputControl, 'my name');
    await userEvent.click(confirmButton);

    const cancelModalButton = screen.getByRole('button', { name: /Cancel/i });
    const confirmModalButton = screen.getByRole('button', {
      name: /Confirmation/i,
    });
    expect(cancelModalButton).toBeInTheDocument();
    expect(confirmModalButton).toBeInTheDocument();

    await userEvent.click(confirmModalButton);

    const invalidNameElement = screen.getByText('Name has been submitted');

    expect(invalidNameElement).toBeInTheDocument();
    expect(cancelModalButton).not.toBeInTheDocument();
    expect(confirmModalButton).not.toBeInTheDocument();
  });
});
