import { TestBed } from '@angular/core/testing';
import { page, userEvent } from 'vitest/browser';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    TestBed.createComponent(AppComponent);
  });

  describe('When component is rendered', () => {
    it('Then should display the form title', async () => {
      const heading = page.getByRole('heading', {
        name: /registration form/i,
      });
      await expect.element(heading).toBeInTheDocument();
    });

    it('Then should display all form fields', async () => {
      await expect.element(page.getByLabelText('Email *')).toBeInTheDocument();
      await expect
        .element(page.getByLabelText('Password *', { exact: true }))
        .toBeInTheDocument();
      await expect
        .element(page.getByLabelText('Confirm Password *'))
        .toBeInTheDocument();
      await expect
        .element(page.getByLabelText('Start Date *'))
        .toBeInTheDocument();
      await expect
        .element(page.getByLabelText('End Date *'))
        .toBeInTheDocument();
    });

    it('Then submit button should be disabled initially', async () => {
      const submitButton = page.getByRole('button', { name: /submit/i });
      await expect.element(submitButton).toBeDisabled();
    });
  });

  describe('Given email field validation', () => {
    describe('When email field is empty and touched', () => {
      it('Then should display required error', async () => {
        const emailInput = page.getByLabelText('Email *');
        await emailInput.click();
        await userEvent.keyboard('{Tab}');

        await expect
          .element(page.getByText('Email is required'))
          .toBeInTheDocument();
      });
    });

    describe('When email is invalid', () => {
      it('Then should display email format error', async () => {
        const emailInput = page.getByLabelText('Email *');
        await emailInput.fill('invalid-email');
        await userEvent.keyboard('{Tab}');

        await expect
          .element(page.getByText('Please enter a valid email address'))
          .toBeInTheDocument();
      });
    });

    describe('When email is valid', () => {
      it('Then should not display any error', async () => {
        const emailInput = page.getByLabelText('Email *');
        await emailInput.fill('test@example.com');
        await userEvent.keyboard('{Tab}');

        await expect
          .element(page.getByText(/email is required/i))
          .not.toBeInTheDocument();
        await expect
          .element(page.getByText(/valid email address/i))
          .not.toBeInTheDocument();
      });
    });
  });

  describe('Given password field validation', () => {
    describe('When password is empty and touched', () => {
      it('Then should display required error', async () => {
        const passwordInput = page.getByLabelText('Password *', {
          exact: true,
        });
        await passwordInput.click();
        await userEvent.keyboard('{Tab}');

        await expect
          .element(page.getByText('Password is required'))
          .toBeInTheDocument();
      });
    });

    describe('When password is too short', () => {
      it('Then should display minimum length error', async () => {
        const passwordInput = page.getByLabelText('Password *', {
          exact: true,
        });
        await passwordInput.fill('12345');
        await userEvent.keyboard('{Tab}');

        await expect
          .element(page.getByText('Password must be at least 6 characters'))
          .toBeInTheDocument();
      });
    });
  });

  describe('Given crossfield validation for password confirmation', () => {
    describe('When passwords do not match', () => {
      it('Then should display password mismatch error', async () => {
        const passwordInput = page.getByLabelText('Password *', {
          exact: true,
        });
        const confirmPasswordInput = page.getByLabelText('Confirm Password *');

        await passwordInput.fill('password123');
        await confirmPasswordInput.fill('password456');
        await userEvent.keyboard('{Tab}');

        await expect
          .element(page.getByText('Passwords do not match'))
          .toBeInTheDocument();
      });

      it('Then submit button should be disabled', async () => {
        const emailInput = page.getByLabelText('Email *');
        const passwordInput = page.getByLabelText('Password *', {
          exact: true,
        });
        const confirmPasswordInput = page.getByLabelText('Confirm Password *');
        const startDateInput = page.getByLabelText('Start Date *');
        const endDateInput = page.getByLabelText('End Date *');

        await emailInput.fill('test@example.com');
        await passwordInput.fill('password123');
        await confirmPasswordInput.fill('password456');
        await startDateInput.fill('2024-01-01');
        await endDateInput.fill('2024-12-31');

        const submitButton = page.getByRole('button', { name: /submit/i });
        await expect.element(submitButton).toBeDisabled();
      });
    });

    describe('When passwords match', () => {
      it('Then should not display password mismatch error', async () => {
        const passwordInput = page.getByLabelText('Password *', {
          exact: true,
        });
        const confirmPasswordInput = page.getByLabelText('Confirm Password *');

        await passwordInput.fill('password123');
        await confirmPasswordInput.fill('password123');
        await userEvent.keyboard('{Tab}');

        await expect
          .element(page.getByText('Passwords do not match'))
          .not.toBeInTheDocument();
      });
    });

    describe('When password changes after confirmation is filled', () => {
      it('Then should re-validate confirmation field', async () => {
        const passwordInput = page.getByLabelText('Password *', {
          exact: true,
        });
        const confirmPasswordInput = page.getByLabelText('Confirm Password *');

        // First, fill matching passwords
        await passwordInput.fill('password123');
        await confirmPasswordInput.fill('password123');
        await userEvent.keyboard('{Tab}');

        // Verify no error
        await expect
          .element(page.getByText('Passwords do not match'))
          .not.toBeInTheDocument();

        // Change password to make them not match
        await passwordInput.clear();
        await passwordInput.fill('newpassword456');
        await userEvent.keyboard('{Tab}');
        await userEvent.keyboard('{Tab}');

        // Now the error should appear automatically
        await expect
          .element(page.getByText('Passwords do not match'))
          .toBeInTheDocument();
      });
    });
  });

  describe('Given crossfield validation for date range', () => {
    describe('When end date is before start date', () => {
      it('Then should display date range error', async () => {
        const startDateInput = page.getByLabelText('Start Date *');
        const endDateInput = page.getByLabelText('End Date *');

        await startDateInput.fill('2024-12-31');
        await endDateInput.fill('2024-01-01');
        await startDateInput.click();

        await expect
          .element(page.getByText('End date must be after start date'))
          .toBeInTheDocument();
      });

      it('Then submit button should be disabled', async () => {
        const emailInput = page.getByLabelText('Email *');
        const passwordInput = page.getByLabelText('Password *', {
          exact: true,
        });
        const confirmPasswordInput = page.getByLabelText('Confirm Password *');
        const startDateInput = page.getByLabelText('Start Date *');
        const endDateInput = page.getByLabelText('End Date *');

        await emailInput.fill('test@example.com');
        await passwordInput.fill('password123');
        await confirmPasswordInput.fill('password123');
        await startDateInput.fill('2024-12-31');
        await endDateInput.fill('2024-01-01');

        const submitButton = page.getByRole('button', { name: /submit/i });
        await expect.element(submitButton).toBeDisabled();
      });
    });

    describe('When end date is after start date', () => {
      it('Then should not display date range error', async () => {
        const startDateInput = page.getByLabelText('Start Date *');
        const endDateInput = page.getByLabelText('End Date *');

        await startDateInput.fill('2024-01-01');
        await endDateInput.fill('2024-12-31');
        await userEvent.keyboard('{Tab}');

        await expect
          .element(page.getByText('End date must be after start date'))
          .not.toBeInTheDocument();
      });
    });

    describe('When start date changes after end date is filled', () => {
      it('Then should re-validate end date field', async () => {
        const startDateInput = page.getByLabelText('Start Date *');
        const endDateInput = page.getByLabelText('End Date *');

        await startDateInput.fill('2024-01-01');
        await endDateInput.fill('2024-12-31');
        await startDateInput.click();

        await expect
          .element(page.getByText('End date must be after start date'))
          .not.toBeInTheDocument();

        await startDateInput.clear();
        await startDateInput.fill('2025-01-01');

        // Now the error should appear automatically
        await expect
          .element(page.getByText('End date must be after start date'))
          .toBeInTheDocument();
      });
    });
  });

  describe('Given valid form data', () => {
    describe('When user fills in all fields correctly', () => {
      it('Then submit button should be enabled', async () => {
        const emailInput = page.getByLabelText('Email *');
        const passwordInput = page.getByLabelText('Password *', {
          exact: true,
        });
        const confirmPasswordInput = page.getByLabelText('Confirm Password *');
        const startDateInput = page.getByLabelText('Start Date *');
        const endDateInput = page.getByLabelText('End Date *');

        await emailInput.fill('test@example.com');
        await passwordInput.fill('password123');
        await confirmPasswordInput.fill('password123');
        await startDateInput.fill('2024-01-01');
        await endDateInput.fill('2024-12-31');

        const submitButton = page.getByRole('button', { name: /submit/i });
        await expect.element(submitButton).toBeEnabled();
      });
    });

    describe('When user submits the form', () => {
      it('Then should display submitted data', async () => {
        const emailInput = page.getByLabelText('Email *');
        const passwordInput = page.getByLabelText('Password *', {
          exact: true,
        });
        const confirmPasswordInput = page.getByLabelText('Confirm Password *');
        const startDateInput = page.getByLabelText('Start Date *');
        const endDateInput = page.getByLabelText('End Date *');

        await emailInput.fill('test@example.com');
        await passwordInput.fill('password123');
        await confirmPasswordInput.fill('password123');
        await startDateInput.fill('2024-01-01');
        await endDateInput.fill('2024-12-31');

        const submitButton = page.getByRole('button', { name: /submit/i });
        await submitButton.click();

        await expect
          .element(page.getByText('Form Submitted Successfully!'))
          .toBeInTheDocument();
      });
    });
  });

  describe('Given reset functionality', () => {
    describe('When user clicks reset button after filling form', () => {
      it('Then should clear all form fields', async () => {
        const emailInput = page.getByLabelText('Email *');
        const passwordInput = page.getByLabelText('Password *', {
          exact: true,
        });
        const confirmPasswordInput = page.getByLabelText('Confirm Password *');
        const startDateInput = page.getByLabelText('Start Date *');
        const endDateInput = page.getByLabelText('End Date *');

        await emailInput.fill('test@example.com');
        await passwordInput.fill('password123');
        await confirmPasswordInput.fill('password123');
        await startDateInput.fill('2024-01-01');
        await endDateInput.fill('2024-12-31');

        const resetButton = page.getByRole('button', { name: /reset/i });
        await resetButton.click();

        await expect.element(emailInput).toHaveValue('');
        await expect.element(passwordInput).toHaveValue('');
        await expect.element(confirmPasswordInput).toHaveValue('');
        await expect.element(startDateInput).toHaveValue('');
        await expect.element(endDateInput).toHaveValue('');
      });

      it('Then should hide submitted data if present', async () => {
        const emailInput = page.getByLabelText('Email *');
        const passwordInput = page.getByLabelText('Password *', {
          exact: true,
        });
        const confirmPasswordInput = page.getByLabelText('Confirm Password *');
        const startDateInput = page.getByLabelText('Start Date *');
        const endDateInput = page.getByLabelText('End Date *');

        await emailInput.fill('test@example.com');
        await passwordInput.fill('password123');
        await confirmPasswordInput.fill('password123');
        await startDateInput.fill('2024-01-01');
        await endDateInput.fill('2024-12-31');

        const submitButton = page.getByRole('button', { name: /submit/i });
        await submitButton.click();

        await expect
          .element(page.getByText('Form Submitted Successfully!'))
          .toBeInTheDocument();

        const resetButton = page.getByRole('button', { name: /reset/i });
        await resetButton.click();

        await expect
          .element(page.getByText('Form Submitted Successfully!'))
          .not.toBeInTheDocument();
      });
    });
  });

  describe('Given form status display', () => {
    describe('When form is invalid', () => {
      it('Then should show form as invalid', async () => {
        const emailInput = page.getByLabelText('Email *');
        await emailInput.fill('test@example.com');
        await expect.element(page.getByText(/Valid:/)).toBeInTheDocument();
        const statusText = await page.getByText(/Valid:/).elements();
        const parentElement = statusText[0].parentElement;
        const noText = parentElement?.textContent;
        expect(noText).toContain('No');
      });
    });

    describe('When form is valid', () => {
      it('Then should show form as valid', async () => {
        const emailInput = page.getByLabelText('Email *');
        const passwordInput = page.getByLabelText('Password *', {
          exact: true,
        });
        const confirmPasswordInput = page.getByLabelText('Confirm Password *');
        const startDateInput = page.getByLabelText('Start Date *');
        const endDateInput = page.getByLabelText('End Date *');

        await emailInput.fill('test@example.com');
        await passwordInput.fill('password123');
        await confirmPasswordInput.fill('password123');
        await startDateInput.fill('2024-01-01');
        await endDateInput.fill('2024-12-31');

        const statusText = await page.getByText(/Valid:/).elements();
        const parentElement = statusText[0].parentElement;
        const yesText = parentElement?.textContent;
        expect(yesText).toContain('Yes');
      });
    });
  });
});
