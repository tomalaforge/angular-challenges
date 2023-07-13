import { AppComponent } from './app.component';

describe(AppComponent.name, () => {
  describe('Given no search criteria', () => {
    it('Then shows error message and disabled button', () => {
      //todo
    });
  });

  describe('Given a search criteria with no book match', () => {
    it('Then shows No book found', () => {
      //todo
    });
  });

  describe('Given a search criteria with one book match', () => {
    it('Then shows One book and no error', () => {
      //todo
    });
  });

  describe('Given a search criteria in Uppercase with one book match', () => {
    it('Then shows One book and no error', () => {
      //todo
    });
  });

  describe('Given a search criteria with multple books matches', () => {
    it('Then shows a list of books', () => {
      //todo
    });
  });
});
