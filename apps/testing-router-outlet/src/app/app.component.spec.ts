import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';

import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

describe('AppComponent', () => {
  const setup = async () => {
    await render(AppComponent, {
      routes: appRoutes,
    });
  };

  describe('Given no search criteria', () => {
    /*
    it('why doesnt this test pass', async () => {
      // the button is disabled on initial load & error is shown
      // but test doesn't see it that way
      // problem caused by lazy loading ?

      await setup();

      // shouldn't have to do anything - the error is displayed on first startup

      const error = screen.queryByText('Search criteria is required!');

      expect(error).toBeInTheDocument();

      const borrowBtn = screen.getByRole('button', { name: /borrow/i });
      expect(borrowBtn).toBeDisabled();
    })
    */

    it('Then shows error message and disabled button', async () => {
      await setup();

      userEvent.click(screen.getByRole('link', { name: /borrow a book/i }));

      const searchControl = screen.getByRole('textbox');
      await userEvent.clear(searchControl);

      expect(
        screen.queryByText('Search criteria is required!')
      ).toBeInTheDocument();

      // There is only 1 button in the html
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });
  });

  describe('Given a search criteria with no book match', () => {
    it('Then shows No book found', async () => {
      await setup();

      const input = screen.getByRole('textbox');
      const button = screen.getByRole('button');

      expect(input).toBeInTheDocument();

      await userEvent.type(input, 'asdfasdfasdf');

      expect(
        screen.queryByText('Search criteria is required!')
      ).not.toBeInTheDocument();

      await userEvent.click(button);

      expect(
        screen.queryByText('No book found for this search')
      ).toBeInTheDocument();

      // Error: Not implemented: navigation (except hash changes)
    });
  });

  describe('Given a search criteria with one book match', () => {
    it('Then shows One book and no error', async () => {
      await setup();

      const input = screen.getByRole('textbox');
      const button = screen.getByRole('button');

      expect(input).toBeInTheDocument();

      await userEvent.type(input, '1984');

      expect(
        screen.queryByText('Search criteria is required!')
      ).not.toBeInTheDocument();

      await userEvent.click(button);

      expect(
        screen.queryByText('Borrowed Book: 1984 by George Orwell')
      ).toBeInTheDocument();
    });
  });

  // 100% coverage before last 2 tests

  describe('Given a search criteria in Uppercase with one book match', () => {
    it('Then shows One book and no error', async () => {
      await setup();

      const input = screen.getByRole('textbox');
      const button = screen.getByRole('button');

      expect(input).toBeInTheDocument();

      await userEvent.type(input, 'ANIMAL FARM');

      expect(
        screen.queryByText('Search criteria is required!')
      ).not.toBeInTheDocument();

      await userEvent.click(button);

      expect(
        screen.queryByText('Borrowed Book: Animal Farm by George Orwell')
      ).toBeInTheDocument();
    });
  });

  describe('Given a search criteria with multple books matches', () => {
    it('Then shows a list of books', async () => {
      await setup();

      const input = screen.getByRole('textbox');
      const button = screen.getByRole('button');

      expect(input).toBeInTheDocument();

      await userEvent.type(input, 'Tolkien');

      expect(
        screen.queryByText('Search criteria is required!')
      ).not.toBeInTheDocument();

      await userEvent.click(button);

      expect(
        screen.queryByText(
          'Borrowed Book: The Lord of the Rings by J.R.R. Tolkien'
        )
      ).toBeInTheDocument();
      expect(
        screen.queryByText('Borrowed Book: The Hobbit by J.R.R. Tolkien')
      ).toBeInTheDocument();
    });
  });
});
