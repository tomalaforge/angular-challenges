import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';

describe('AppComponent', () => {
  const setup = async () => {
    await render(AppComponent, {
      routes: appRoutes,
    });
  };

  async function initSearch(search: string) {
    await setup();

    await userEvent.click(screen.getByRole('link', { name: /borrow a book/i }));

    const searchControl = screen.getByRole('textbox');
    await userEvent.type(searchControl, search);

    userEvent.click(screen.getByRole('button', { name: /borrow/i }));
  }
  describe('Given no search criteria', () => {
    it('Then shows error message and disabled button', async () => {
      await setup();

      userEvent.click(screen.getByRole('link', { name: /borrow a book/i }));

      const searchControl = screen.getByRole('textbox');
      await userEvent.clear(searchControl);

      expect(
        screen.queryByText('Search criteria is required!')
      ).toBeInTheDocument();

      const borrowBtn = screen.getByRole('button', { name: /borrow/i });
      expect(borrowBtn).toBeDisabled();

      await userEvent.type(searchControl, 't');

      expect(
        screen.queryByText('Search criteria is required!')
      ).not.toBeInTheDocument();
      expect(borrowBtn).toBeEnabled();
    });
  });

  describe('Given a search criteria with no book match', () => {
    it('Then shows No book found', async () => {
      await initSearch('sdklmfjksdlj');

      await screen.findByText('No book found for this search');
    });
  });

  describe('Given a search criteria with one book match', () => {
    it('Then shows One book and no error', async () => {
      await initSearch('kill');

      await screen.findByText(/Book: To Kill a Mockingbird/);
      expect(
        screen.queryByText(/The Lord of the Rings/)
      ).not.toBeInTheDocument();
    });
  });

  describe('Given a search criteria in Uppercase with one book match', () => {
    it('Then shows One book and no error', async () => {
      await initSearch('KILL');

      await screen.findByText(/Book: To Kill a Mockingbird/);
      expect(
        screen.queryByText(/The Lord of the Rings/)
      ).not.toBeInTheDocument();
    });
  });

  describe('Given a search criteria with multple books matches', () => {
    it('Then shows a list of books', async () => {
      await initSearch('Tolkien');

      await screen.findByText(/The Lord of the Rings/);
      await screen.findByText(/The Hobbit/);
      expect(
        screen.queryByText(/Book: To Kill a Mockingbird/)
      ).not.toBeInTheDocument();
    });
  });
});
