import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import exp = require('constants');

describe.only('AppComponent', () => {
  const search = async (text: string) => {
    await render(AppComponent, { routes: appRoutes });

    const searchControl = screen.getByRole('textbox', {
      name: /search book by author or title/i,
    });
    const borrowBtn = screen.getByRole('button', { name: /borrow/i });

    await userEvent.type(searchControl, text);
    await userEvent.click(borrowBtn);
  };

  describe('Given no search criteria', () => {
    it('Then shows error message and disabled button', async () => {
      await render(AppComponent, { routes: appRoutes });

      const searchControl = screen.getByRole('textbox', {
        name: /search book by author or title/i,
      });
      userEvent.clear(searchControl);

      expect(screen.getByTestId('search-error-msg')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /borrow/i })).toBeDisabled();
    });
  });

  describe('Given a search criteria with no book match', () => {
    it('Then shows No book found', async () => {
      await search('NonExistingBook');

      expect(screen.getByTestId('no-book-found-msg')).toBeInTheDocument();
    });
  });

  describe('Given a search criteria with one book match', () => {
    it('Then shows One book and no error', async () => {
      await search('1984');

      expect(screen.queryByTestId('search-error-msg')).not.toBeInTheDocument();
      expect(screen.getByText(/1984 by George Orwell/i)).toBeInTheDocument();
    });
  });

  describe('Given a search criteria in Uppercase with one book match', () => {
    it('Then shows One book and no error', async () => {
      await search('HOBBIT');

      expect(screen.queryByTestId('search-error-msg')).not.toBeInTheDocument();
      expect(
        screen.getByText(/The Hobbit by J.R.R. Tolkien/i),
      ).toBeInTheDocument();
    });
  });

  describe('Given a search criteria with multple books matches', () => {
    it('Then shows a list of books', async () => {
      await search('the');

      expect(
        screen.getByText(/The Hobbit by J.R.R. Tolkien/i),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/The Catcher in the Rye by J.D. Salinger/i),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/The Lord of the Rings by J.R.R. Tolkien/i),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/The Great Gats by F. Scott Fitzgerald/i),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /Harry Potter and the Philosopher's Stone by J.K. Rowling/i,
        ),
      ).toBeInTheDocument();
      expect(screen.getByText(/The Hunger Games/i)).toBeInTheDocument();
    });
  });
});
