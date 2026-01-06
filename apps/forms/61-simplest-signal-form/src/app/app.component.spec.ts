import { TestBed } from '@angular/core/testing';
import { page, userEvent } from 'vitest/browser';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    TestBed.createComponent(AppComponent);
  });

  describe('When component is rendered', () => {
    it('Then should display the form title', async () => {
      const heading = page.getByRole('heading', { name: /simple form/i });
      await expect.element(heading).toBeInTheDocument();
    });

    it('Then should display all form fields', async () => {
      await expect.element(page.getByLabelText('Name *')).toBeInTheDocument();
      await expect
        .element(page.getByLabelText(/last name/i))
        .toBeInTheDocument();
      await expect.element(page.getByLabelText(/age/i)).toBeInTheDocument();
      await expect.element(page.getByLabelText(/note/i)).toBeInTheDocument();
    });

    it('Then submit button should be disabled initially', async () => {
      const submitButton = page.getByRole('button', { name: /submit/i });
      await expect.element(submitButton).toBeDisabled();
    });
  });

  describe('Given valid form data', () => {
    describe('When user fills in all required fields', () => {
      it('Then submit button should be enabled', async () => {
        const nameInput = page.getByLabelText('Name *');
        await nameInput.fill('John');

        const submitButton = page.getByRole('button', { name: /submit/i });
        await expect.element(submitButton).toBeEnabled();
      });
    });

    describe('When user submits the form', () => {
      it('Then should display submitted data', async () => {
        const nameInput = page.getByLabelText('Name *');
        const lastnameInput = page.getByLabelText(/last name/i);
        const ageInput = page.getByLabelText(/age/i);
        const noteInput = page.getByLabelText(/note/i);

        await nameInput.fill('John');
        await lastnameInput.fill('Doe');
        await ageInput.fill('25');
        await noteInput.fill('Test note');

        const submitButton = page.getByRole('button', { name: /submit/i });
        await submitButton.click();

        await expect
          .element(page.getByText('Submitted Data:'))
          .toBeInTheDocument();
        await expect
          .element(page.getByText(/"name": "John"/))
          .toBeInTheDocument();
        await expect
          .element(page.getByText(/"lastname": "Doe"/))
          .toBeInTheDocument();
        await expect.element(page.getByText(/"age": 25/)).toBeInTheDocument();
        await expect
          .element(page.getByText(/"note": "Test note"/))
          .toBeInTheDocument();
      });
    });
  });

  describe('Given name field validation', () => {
    describe('When name field is empty and touched', () => {
      it('Then should display required error', async () => {
        const nameInput = page.getByLabelText('Name *');
        await nameInput.click();
        await userEvent.keyboard('{Tab}');

        await expect
          .element(page.getByText('Name is required'))
          .toBeInTheDocument();
      });

      it('Then submit button should be disabled', async () => {
        const nameInput = page.getByLabelText('Name *');
        await nameInput.click();
        await userEvent.keyboard('{Tab}');

        const submitButton = page.getByRole('button', { name: /submit/i });
        await expect.element(submitButton).toBeDisabled();
      });
    });
  });

  describe('Given age field validation', () => {
    describe('When age is less than 1', () => {
      it('Then should display min error', async () => {
        const nameInput = page.getByLabelText('Name *');
        const ageInput = page.getByLabelText(/age/i);

        await nameInput.fill('John');
        await ageInput.fill('0');
        await userEvent.keyboard('{Tab}');

        await expect
          .element(page.getByText('Age must be at least 1'))
          .toBeInTheDocument();
      });
    });

    describe('When age is greater than 99', () => {
      it('Then should display max error', async () => {
        const nameInput = page.getByLabelText('Name *');
        const ageInput = page.getByLabelText(/age/i);

        await nameInput.fill('John');
        await ageInput.fill('100');
        await userEvent.keyboard('{Tab}');

        await expect
          .element(page.getByText('Age must be at most 99'))
          .toBeInTheDocument();
      });
    });

    describe('When age is between 1 and 99', () => {
      it('Then should not display any error', async () => {
        const nameInput = page.getByLabelText('Name *');
        const ageInput = page.getByLabelText(/age/i);

        await nameInput.fill('John');
        await ageInput.fill('50');
        await userEvent.keyboard('{Tab}');

        await expect
          .element(page.getByText(/age must be/i))
          .not.toBeInTheDocument();
      });
    });
  });

  describe('Given optional fields', () => {
    describe('When lastname and note are empty', () => {
      it('Then should still allow form submission with valid name', async () => {
        const nameInput = page.getByLabelText('Name *');
        await nameInput.fill('John');

        const submitButton = page.getByRole('button', { name: /submit/i });
        await expect.element(submitButton).toBeEnabled();

        await submitButton.click();

        await expect
          .element(page.getByText('Submitted Data:'))
          .toBeInTheDocument();
      });
    });
  });

  describe('Given reset functionality', () => {
    describe('When user clicks reset button after filling form', () => {
      it('Then should clear all form fields', async () => {
        const nameInput = page.getByLabelText('Name *');
        const lastnameInput = page.getByLabelText(/last name/i);
        const ageInput = page.getByLabelText(/age/i);
        const noteInput = page.getByLabelText(/note/i);

        await nameInput.fill('John');
        await lastnameInput.fill('Doe');
        await ageInput.fill('25');
        await noteInput.fill('Test note');

        const resetButton = page.getByRole('button', { name: /reset/i });
        await resetButton.click();

        await expect.element(nameInput).toHaveValue('');
        await expect.element(lastnameInput).toHaveValue('');
        await expect.element(ageInput).toHaveValue(null);
        await expect.element(noteInput).toHaveValue('');
      });

      it('Then should hide submitted data if present', async () => {
        const nameInput = page.getByLabelText('Name *');
        await nameInput.fill('John');

        const submitButton = page.getByRole('button', { name: /submit/i });
        await submitButton.click();

        await expect
          .element(page.getByText('Submitted Data:'))
          .toBeInTheDocument();

        const resetButton = page.getByRole('button', { name: /reset/i });
        await resetButton.click();

        await expect
          .element(page.getByText('Submitted Data:'))
          .not.toBeInTheDocument();
      });
    });
  });

  // describe('Given form styling', () => {
  //   describe('When field has validation error', () => {
  //     it('Then should display red border on name field', async () => {
  //       const nameInput = page.getByLabelText(/^Name$/i);
  //       await nameInput.click();
  //       await userEvent.keyboard('{Tab}');
  //
  //       await expect.element(nameInput).toHaveClass('border-red-500');
  //     });
  //
  //     it('Then should display red border on age field when invalid', async () => {
  //       const nameInput = page.getByLabelText(/^Name$/i);
  //       const ageInput = page.getByLabelText(/age/i);
  //
  //       await nameInput.fill('John');
  //       await ageInput.fill('0');
  //       await page.keyboard.press('Tab');
  //
  //       await expect.element(ageInput).toHaveClass('border-red-500');
  //     });
  //   });
  // });
});
