import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';

describe('AppComponent', () => {
  async function setup() {
    await render(AppComponent, { routes: appRoutes });
  }

  describe('Given no search criteria', () => {
    it('Then shows error message and disabled button', async () => {
      // Arrange
      await setup();

      // Act
      await userEvent.click(
        screen.getByRole('link', { name: /borrow a book/i }),
      );

      // Assert
      expect(screen.getByRole('button', { name: /borrow/i })).toBeDisabled();
      await screen.findByText(/search criteria is required!/i);
    });
  });

  describe('Given a search criteria with no book match', () => {
    it('Then shows No book found', async () => {
      // Arrange
      await setup();
      const inputField = screen.getByRole('textbox', {
        name: /search book by author or title/i,
      });
      const borrowButton = screen.getByRole('button', { name: /borrow/i });

      // Act
      await userEvent.type(inputField, 'Not Found');
      await userEvent.click(borrowButton);

      // Assert
      await screen.findByText(/no book found for this search/i);
    });
  });

  describe('Given a search criteria with one book match', () => {
    it('Then shows One book and no error', async () => {
      // Arrange
      await setup();
      const inputField = screen.getByRole('textbox', {
        name: /search book by author or title/i,
      });
      const borrowButton = screen.getByRole('button', { name: /borrow/i });

      // Act
      await userEvent.type(inputField, 'Harry');
      await userEvent.click(borrowButton);

      // Assert
      expect(screen.queryByText(/no book found for this search/i)).toBeFalsy();
      expect(screen.queryByText(/search criteria is required!/i)).toBeFalsy();
      expect(screen.queryByText(/The Lord of the Rings/)).toBeFalsy();
      expect(screen.getAllByRole('listitem')).toHaveLength(1);
      expect(screen.getByRole('listitem')).toHaveTextContent(/Harry Potter/);
    });
  });

  describe('Given a search criteria in Uppercase with one book match', () => {
    it('Then shows One book and no error', async () => {
      // Arrange
      await setup();
      const inputField = screen.getByRole('textbox', {
        name: /search book by author or title/i,
      });
      const borrowButton = screen.getByRole('button', { name: /borrow/i });

      // Act
      await userEvent.type(inputField, 'HARRY');
      await userEvent.click(borrowButton);

      // Assert
      expect(screen.queryByText(/no book found for this search/i)).toBeFalsy();
      expect(screen.queryByText(/search criteria is required!/i)).toBeFalsy();
      expect(screen.queryByText(/The Lord of the Rings/)).toBeFalsy();
      expect(screen.getAllByRole('listitem')).toHaveLength(1);
      expect(screen.getByRole('listitem')).toHaveTextContent(/Harry Potter/);
    });
  });

  describe('Given a search criteria with multiple books matches', () => {
    it('Then shows a list of books', async () => {
      // Arrange
      await setup();
      const inputField = screen.getByRole('textbox', {
        name: /search book by author or title/i,
      });
      const borrowButton = screen.getByRole('button', { name: /borrow/i });

      // Act
      await userEvent.type(inputField, 'Orwell');
      await userEvent.click(borrowButton);

      // Assert
      expect(screen.queryByText(/no book found for this search/i)).toBeFalsy();
      expect(screen.queryByText(/search criteria is required!/i)).toBeFalsy();
      expect(screen.queryByText(/The Lord of the Rings/)).toBeFalsy();
      expect(screen.getAllByRole('listitem')).toHaveLength(2);
      await screen.findByText(/Animal Farm/i);
      await screen.findByText(/1984/i);
    });
  });
});
