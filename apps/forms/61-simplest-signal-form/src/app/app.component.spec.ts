import { render, screen } from '@testing-library/angular';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  describe('When component is rendered', () => {
    it('Then should display the form title', async () => {
      await render(AppComponent);

      expect(screen.getByText('Simple Form')).toBeInTheDocument();
    });

    it('Then should display all form fields', async () => {
      await render(AppComponent);

      expect(screen.getByLabelText(/^Name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/note/i)).toBeInTheDocument();
    });

    it('Then submit button should be disabled initially', async () => {
      await render(AppComponent);

      const submitButton = screen.getByRole('button', { name: /submit/i });
      expect(submitButton).toBeDisabled();
    });
  });

  describe('Given valid form data', () => {
    describe('When user fills in all required fields', () => {
      it('Then submit button should be enabled', async () => {
        const user = userEvent.setup();
        await render(AppComponent);

        const nameInput = screen.getByLabelText(/^Name/i);
        await user.type(nameInput, 'John');

        const submitButton = screen.getByRole('button', { name: /submit/i });
        expect(submitButton).toBeEnabled();
      });
    });

    describe('When user submits the form', () => {
      it('Then should display submitted data', async () => {
        const user = userEvent.setup();
        await render(AppComponent);

        const nameInput = screen.getByLabelText(/^Name/i);
        const lastnameInput = screen.getByLabelText(/last name/i);
        const ageInput = screen.getByLabelText(/age/i);
        const noteInput = screen.getByLabelText(/note/i);

        await user.type(nameInput, 'John');
        await user.type(lastnameInput, 'Doe');
        await user.type(ageInput, '25');
        await user.type(noteInput, 'Test note');

        const submitButton = screen.getByRole('button', { name: /submit/i });
        await user.click(submitButton);

        expect(screen.getByText('Submitted Data:')).toBeInTheDocument();
        expect(screen.getByText(/"name": "John"/)).toBeInTheDocument();
        expect(screen.getByText(/"lastname": "Doe"/)).toBeInTheDocument();
        expect(screen.getByText(/"age": 25/)).toBeInTheDocument();
        expect(screen.getByText(/"note": "Test note"/)).toBeInTheDocument();
      });
    });
  });

  describe('Given name field validation', () => {
    describe('When name field is empty and touched', () => {
      it('Then should display required error', async () => {
        const user = userEvent.setup();
        await render(AppComponent);

        const nameInput = screen.getByLabelText(/^Name/i);
        await user.click(nameInput);
        await user.tab();

        expect(screen.getByText('Name is required')).toBeInTheDocument();
      });

      it('Then submit button should be disabled', async () => {
        const user = userEvent.setup();
        await render(AppComponent);

        const nameInput = screen.getByLabelText(/^Name/i);
        await user.click(nameInput);
        await user.tab();

        const submitButton = screen.getByRole('button', { name: /submit/i });
        expect(submitButton).toBeDisabled();
      });
    });
  });

  describe('Given age field validation', () => {
    describe('When age is less than 1', () => {
      it('Then should display min error', async () => {
        const user = userEvent.setup();
        await render(AppComponent);

        const nameInput = screen.getByLabelText(/^Name/i);
        const ageInput = screen.getByLabelText(/age/i);

        await user.type(nameInput, 'John');
        await user.type(ageInput, '0');
        await user.tab();

        expect(screen.getByText('Age must be at least 1')).toBeInTheDocument();
      });
    });

    describe('When age is greater than 99', () => {
      it('Then should display max error', async () => {
        const user = userEvent.setup();
        await render(AppComponent);

        const nameInput = screen.getByLabelText(/^Name/i);
        const ageInput = screen.getByLabelText(/age/i);

        await user.type(nameInput, 'John');
        await user.type(ageInput, '100');
        await user.tab();

        expect(screen.getByText('Age must be at most 99')).toBeInTheDocument();
      });
    });

    describe('When age is between 1 and 99', () => {
      it('Then should not display any error', async () => {
        const user = userEvent.setup();
        await render(AppComponent);

        const nameInput = screen.getByLabelText(/^Name/i);
        const ageInput = screen.getByLabelText(/age/i);

        await user.type(nameInput, 'John');
        await user.type(ageInput, '50');
        await user.tab();

        expect(screen.queryByText(/age must be/i)).not.toBeInTheDocument();
      });
    });
  });

  describe('Given optional fields', () => {
    describe('When lastname and note are empty', () => {
      it('Then should still allow form submission with valid name', async () => {
        const user = userEvent.setup();
        await render(AppComponent);

        const nameInput = screen.getByLabelText(/^Name/i);
        await user.type(nameInput, 'John');

        const submitButton = screen.getByRole('button', { name: /submit/i });
        expect(submitButton).toBeEnabled();

        await user.click(submitButton);

        expect(screen.getByText('Submitted Data:')).toBeInTheDocument();
      });
    });
  });

  describe('Given reset functionality', () => {
    describe('When user clicks reset button after filling form', () => {
      it('Then should clear all form fields', async () => {
        const user = userEvent.setup();
        await render(AppComponent);

        const nameInput = screen.getByLabelText(/^Name/i) as HTMLInputElement;
        const lastnameInput = screen.getByLabelText(
          /last name/i,
        ) as HTMLInputElement;
        const ageInput = screen.getByLabelText(/age/i) as HTMLInputElement;
        const noteInput = screen.getByLabelText(/note/i) as HTMLInputElement;

        await user.type(nameInput, 'John');
        await user.type(lastnameInput, 'Doe');
        await user.type(ageInput, '25');
        await user.type(noteInput, 'Test note');

        const resetButton = screen.getByRole('button', { name: /reset/i });
        await user.click(resetButton);

        expect(nameInput.value).toBe('');
        expect(lastnameInput.value).toBe('');
        expect(ageInput.value).toBe('');
        expect(noteInput.value).toBe('');
      });

      it('Then should hide submitted data if present', async () => {
        const user = userEvent.setup();
        await render(AppComponent);

        const nameInput = screen.getByLabelText(/^Name/i);
        await user.type(nameInput, 'John');

        const submitButton = screen.getByRole('button', { name: /submit/i });
        await user.click(submitButton);

        expect(screen.getByText('Submitted Data:')).toBeInTheDocument();

        const resetButton = screen.getByRole('button', { name: /reset/i });
        await user.click(resetButton);

        expect(screen.queryByText('Submitted Data:')).not.toBeInTheDocument();
      });
    });
  });

  describe('Given form styling', () => {
    describe('When field has validation error', () => {
      it('Then should display red border on name field', async () => {
        const user = userEvent.setup();
        await render(AppComponent);

        const nameInput = screen.getByLabelText(/^Name/i);
        await user.click(nameInput);
        await user.tab();

        expect(nameInput).toHaveClass('border-red-500');
      });

      it('Then should display red border on age field when invalid', async () => {
        const user = userEvent.setup();
        await render(AppComponent);

        const nameInput = screen.getByLabelText(/^Name/i);
        const ageInput = screen.getByLabelText(/age/i);

        await user.type(nameInput, 'John');
        await user.type(ageInput, '0');
        await user.tab();

        expect(ageInput).toHaveClass('border-red-500');
      });
    });
  });
});
