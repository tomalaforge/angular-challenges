import { screen, render, fireEvent } from '@testing-library/angular';
import { within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  const expectedNameInvalidErrorMessage = 'Name is invalid !!';
  const expectedNameRequiredErrorMessage = 'You must enter a name first!!';

  async function writeNameIntoControl(name: string) {
    const control = screen.getByRole('textbox', { name: /name/i });
    await userEvent.type(control, name);
  }

  function clickConfirmControl() {
    const control = screen.getByText('Confirm');
    fireEvent.click(control);
  }

  async function clickCancelControlInModal() {
    const control = within(await getModal()).getByText('Cancel');
    fireEvent.click(control);
  }

  async function clickConfirmControlInModal() {
    const control = within(await getModal()).getByText('Confirmation');
    fireEvent.click(control);
  }

  async function getModal(): Promise<HTMLElement> {
    return screen.getByRole('dialog');
  }

  beforeEach(async () => {
    await render(AppComponent);
  });

  test('error modal is displayed if you click on "Confirm" without inputing a name', async () => {
    clickConfirmControl();

    expect(
      screen.getByText(
        (content, element) =>
          element?.textContent?.trim() === expectedNameRequiredErrorMessage
      )
    ).toBeInTheDocument();
  });

  test('error message is shown if you click "Cancel" in the confirmation modal after submitting a name', async () => {
    await writeNameIntoControl('Harry Potter');
    clickConfirmControl();
    await clickCancelControlInModal();

    expect(
      screen.getByText(expectedNameInvalidErrorMessage)
    ).toBeInTheDocument();
  });

  test('confirm message is shown if you click "Confirm" in the confirmation modal after submitting a name', async () => {
    await writeNameIntoControl('Harry Potter');
    clickConfirmControl();
    await clickConfirmControlInModal();
  });
});
