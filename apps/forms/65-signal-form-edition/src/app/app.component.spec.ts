import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { page } from 'vitest/browser';
import { AppComponent } from './app.component';
import { appConfig } from './app.config';

describe('AppComponent', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: appConfig.providers,
    });
    const router = TestBed.inject(Router);
    router.initialNavigation();
    TestBed.createComponent(AppComponent);
  });

  describe('When component is rendered', () => {
    it('Then should display the portal title', async () => {
      const heading = page.getByRole('heading', {
        name: /user management portal/i,
      });
      await expect.element(heading).toBeInTheDocument();
    });

    it('Then should display correct information in the user list', async () => {
      await expect
        .element(page.getByText('Max Mustermann'))
        .toBeInTheDocument();
      await expect.element(page.getByText('John Doe')).toBeInTheDocument();
      await expect.element(page.getByText('Jane Smith')).toBeInTheDocument();
    });
  });

  describe('Given a user wants to add a new user', () => {
    it('Then should navigate to add form and create user', async () => {
      const addButton = page.getByRole('button', { name: /add user/i }).first();
      await addButton.click();

      await expect
        .element(page.getByRole('heading', { name: /add new user/i }))
        .toBeInTheDocument();

      await page.getByLabelText(/firstname/i).fill('Antigravity');
      await page.getByLabelText(/lastname/i).fill('AI');
      await page.getByLabelText(/age/i).fill('1');
      await page.getByLabelText(/grade/i).fill('10');

      await page.getByRole('button', { name: /add/i }).click();

      await expect
        .element(page.getByText('Antigravity AI'))
        .toBeInTheDocument();
    });
  });

  describe('Given a user wants to edit an existing user', () => {
    it('Then should update the user successfully', async () => {
      await expect.element(page.getByText('Jane Smith')).toBeInTheDocument();

      const editButtons = await page
        .getByRole('button', { name: /edit/i })
        .all();
      // Jane Smith is the 3rd user in list (id 3)
      await editButtons[2].click();

      await expect
        .element(page.getByRole('heading', { name: /edit user/i }))
        .toBeInTheDocument();
      await expect
        .element(page.getByLabelText(/firstname/i))
        .toHaveValue('Jane');

      await page.getByLabelText(/firstname/i).fill('Janet');
      await page.getByRole('button', { name: /update/i }).click();

      await expect.element(page.getByText('Janet Smith')).toBeInTheDocument();
      await expect
        .element(page.getByText('Jane Smith'))
        .not.toBeInTheDocument();
    });
  });

  describe('Given a user wants to delete a user', () => {
    it('Then should remove the user from the list', async () => {
      await expect.element(page.getByText('John Doe')).toBeInTheDocument();

      const deleteButtons = await page
        .getByRole('button', { name: /delete/i })
        .all();
      // John Doe is the 2nd user in list
      await deleteButtons[1].click();

      await expect.element(page.getByText('John Doe')).not.toBeInTheDocument();
    });
  });
});
