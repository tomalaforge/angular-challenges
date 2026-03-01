import { TestBed } from '@angular/core/testing';
import { page, userEvent } from 'vitest/browser';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    TestBed.createComponent(AppComponent);
  });

  describe('When component is rendered', () => {
    it('Then should show the form as incomplete initially', async () => {
      await expect
        .element(page.getByText(/form incomplete/i))
        .toBeInTheDocument();
      await expect
        .element(page.getByRole('button', { name: /submit/i }))
        .toBeEnabled();
    });
  });

  describe('Given dynamic arrays', () => {
    it('Then should add and remove contacts and emails', async () => {
      await userEvent.click(page.getByRole('button', { name: /add contact/i }));
      await userEvent.click(page.getByRole('button', { name: /add contact/i }));
      await expect.element(page.getByText(/contact 2/i)).toBeInTheDocument();

      await userEvent.click(
        page.getByRole('button', { name: /remove contact 2/i }),
      );
      await expect
        .element(page.getByText(/contact 2/i))
        .not.toBeInTheDocument();

      await userEvent.click(page.getByRole('button', { name: /add email/i }));
      await userEvent.click(page.getByRole('button', { name: /add email/i }));
      await expect.element(page.getByText(/email 2/i)).toBeInTheDocument();

      await userEvent.click(
        page.getByRole('button', { name: /remove email 2/i }),
      );
      await expect.element(page.getByText(/email 2/i)).not.toBeInTheDocument();
    });
  });

  describe('Given valid form data', () => {
    it('Then should submit and display the submitted data', async () => {
      await userEvent.click(page.getByRole('button', { name: /add contact/i }));
      await userEvent.type(
        page.getByRole('textbox', { name: /^Name\s*$/i }),
        'Alex',
      );
      await userEvent.type(
        page.getByRole('textbox', { name: /^Pseudo\s*$/i }),
        'Nexus',
      );
      await userEvent.type(
        page.getByRole('textbox', { name: /^First name\s*$/i }),
        'Jamie',
      );
      await userEvent.type(
        page.getByRole('textbox', { name: /^Last name\s*$/i }),
        'Doe',
      );
      await userEvent.type(
        page.getByRole('textbox', { name: /^Relation\s*$/i }),
        'Friend',
      );
      await userEvent.type(
        page.getByRole('textbox', { name: /^Email\s*$/i }),
        'jamie@example.com',
      );

      await userEvent.click(page.getByRole('button', { name: /submit/i }));

      await expect
        .element(page.getByRole('heading', { name: /submitted data/i }))
        .toBeInTheDocument();
      await expect
        .element(page.getByText(/"name": "Alex"/))
        .toBeInTheDocument();
      await expect.element(page.getByText(/"contacts":/)).toBeInTheDocument();
    });
  });

  describe('Given invalid form data', () => {
    it('Then should show required errors on submit', async () => {
      await userEvent.click(page.getByRole('button', { name: /submit/i }));

      await expect
        .element(page.getByText(/Name\s*This field is required/i))
        .toBeInTheDocument();
      await expect
        .element(page.getByText(/Pseudo\s*This field is required/i))
        .toBeInTheDocument();
      await expect
        .element(page.getByText(/at least one contact is required/i))
        .toBeInTheDocument();
    });

    it('Then should show contact required errors on submit', async () => {
      await userEvent.click(page.getByRole('button', { name: /add contact/i }));
      await userEvent.click(page.getByRole('button', { name: /submit/i }));

      await expect
        .element(page.getByText(/email is required/i))
        .toBeInTheDocument();
    });

    it('Then should show email format error for a contact', async () => {
      await userEvent.click(page.getByRole('button', { name: /add contact/i }));
      await userEvent.type(
        page.getByRole('textbox', { name: /^First name\s*$/i }),
        'Jamie',
      );
      await userEvent.type(
        page.getByRole('textbox', { name: /^Last name\s*$/i }),
        'Doe',
      );
      await userEvent.type(
        page.getByRole('textbox', { name: /^Relation\s*$/i }),
        'Friend',
      );
      await userEvent.type(
        page.getByRole('textbox', { name: /^Email\s*$/i }),
        'invalid',
      );

      await expect
        .element(page.getByText(/enter a valid email/i))
        .toBeInTheDocument();
    });

    it('Then should show required errors for email entries on submit', async () => {
      await userEvent.click(page.getByRole('button', { name: /add email/i }));
      await userEvent.click(page.getByRole('button', { name: /submit/i }));

      await expect
        .element(page.getByText(/email is required/i))
        .toBeInTheDocument();
    });

    it('Then should show email format error for an email entry', async () => {
      await userEvent.click(page.getByRole('button', { name: /add email/i }));
      await userEvent.type(
        page.getByRole('textbox', { name: /^Email\s*$/i }),
        'invalid',
      );

      await expect
        .element(page.getByText(/enter a valid email/i))
        .toBeInTheDocument();
    });
  });
});
