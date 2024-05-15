import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  async function setup() {
    await render(AppComponent);
  }

  test('error modal is displayed if you click on "Confirm" without inputting a name', async () => {
    // Arrange
    await setup();

    // Act
    await userEvent.click(screen.getByText(/confirm/i));

    // Assert
    expect(screen.getByRole('dialog')).toBeTruthy();
    expect(screen.getByRole('heading', { name: /error/i })).toBeTruthy();
    expect(screen.getByText(/you must enter a first!!/i)).toBeTruthy();
  });

  test('error message is shown if you click "Cancel" in the confirmation modal after submitting a name', async () => {
    // Arrange
    await setup();

    // Act
    await userEvent.type(
      screen.getByRole('textbox', { name: /name/i }),
      'John Doe',
    );
    await userEvent.click(screen.getByText(/confirm/i));

    // Assert
    expect(screen.getByRole('dialog')).toBeTruthy();
    expect(screen.getByRole('heading', { name: /profil/i })).toBeTruthy();
    expect(screen.getByText(/name: john doe/i)).toBeTruthy();

    // Act
    await userEvent.click(screen.getByText(/cancel/i));

    // Assert
    expect(screen.getByText(/name is invalid !!/i)).toBeTruthy();
    expect(screen.queryByText(/you must enter a first!!/i)).toBeFalsy();
  });

  test('confirm message is shown if you click "Confirm" in the confirmation modal after submitting a name', async () => {
    // Arrange
    await setup();

    // Act
    await userEvent.type(
      screen.getByRole('textbox', { name: /name/i }),
      'John Doe',
    );
    await userEvent.click(screen.getByText(/confirm/i));

    // Assert
    expect(screen.getByRole('dialog')).toBeTruthy();
    expect(screen.getByRole('heading', { name: /profil/i })).toBeTruthy();
    expect(screen.getByText(/name: john doe/i)).toBeTruthy();
    expect(screen.queryByText(/you must enter a first!!/i)).toBeFalsy();

    // Act
    await userEvent.click(screen.getByText(/confirmation/i));

    // Assert
    expect(screen.getByText(/name has been submitted/i)).toBeTruthy();
    expect(screen.queryByText(/name is invalid !!/i)).toBeFalsy();
    expect(screen.queryByText(/you must enter a first!!/i)).toBeFalsy();
  });
});
