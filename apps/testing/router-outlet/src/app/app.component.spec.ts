import { userEvent } from '@testing-library/user-event';
import { render, screen } from '@testing-library/angular';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
describe('AppComponent', () => {
  const setup = async () => {
    await render(AppComponent, {
      routes: appRoutes,
    });
    await userEvent.click(screen.getByRole('link', { name: /borrow a book/i }));
  };

  const searchInput = async (value: string) => {
    const input = await screen.getByRole('textbox');
    const borrowBtn = await screen.getByRole('button', { name: 'Borrow' });
    await userEvent.type(input, value);
    await userEvent.click(borrowBtn);
  };
  describe('Given no search criteria', () => {
    it('Then shows error message and disabled button', async () => {
      //todo
      await setup();
      const input = screen.getByRole('textbox');
      await userEvent.clear(input);
      expect(
        await screen.queryByText('Search criteria is required!')
      ).toBeInTheDocument();

      expect(
        await screen.getByRole('button', { name: 'Borrow' })
      ).toBeDisabled();
    });
  });

  describe('Given a search criteria with no book match', () => {
    it('Then shows No book found', async () => {
      //todo
      await setup();
      await searchInput('asdasd');
      expect(
        await screen.queryByText('No book found for this search')
      ).toBeInTheDocument();
    });
  });

  describe('Given a search criteria with one book match', () => {
    it('Then shows One book and no error', async () => {
      //todo
      await setup();
      await searchInput('harper');
      expect(
        await screen.queryByText(
          'Borrowed Book: To Kill a Mockingbird by Harper Lee'
        )
      ).toBeInTheDocument();
      expect(
        await screen.queryByText('Borrowed Book: Animal Farm by George Orwell')
      ).not.toBeInTheDocument();
    });
  });

  describe('Given a search criteria in Uppercase with one book match', () => {
    it('Then shows One book and no error', async () => {
      //todo
      await setup();
      await searchInput('HARPER');
      expect(
        await screen.queryByText(
          'Borrowed Book: To Kill a Mockingbird by Harper Lee'
        )
      ).toBeInTheDocument();
      expect(
        await screen.queryByText('Borrowed Book: Animal Farm by George Orwell')
      ).not.toBeInTheDocument();
    });
  });

  describe('Given a search criteria with multple books matches', () => {
    it('Then shows a list of books', async () => {
      //todo
      await setup();
      await searchInput('Tolkien');
      expect(
        await screen.queryByText('Borrowed Book: The Hobbit by J.R.R. Tolkien')
      ).toBeInTheDocument();

      expect(
        await screen.queryByText(
          'Borrowed Book: The Lord of the Rings by J.R.R. Tolkien'
        )
      ).toBeInTheDocument();

      expect(
        await screen.queryByText('Borrowed Book: Animal Farm by George Orwell')
      ).not.toBeInTheDocument();
    });
  });
});
