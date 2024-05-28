import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture } from '@angular/core/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { render, screen } from '@testing-library/angular';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';

describe('AppComponent', () => {
  let loader: HarnessLoader;
  let fixture: ComponentFixture<AppComponent>;
  let searchInput: MatInputHarness;
  let borrowButton: MatButtonHarness;

  beforeEach(async () => {
    const renderResult = await render(AppComponent, {
      routes: appRoutes,
    });

    fixture = renderResult.fixture;
    loader = TestbedHarnessEnvironment.loader(fixture);
    searchInput = await loader.getHarness(MatInputHarness);
    borrowButton = await loader.getHarness(MatButtonHarness);
  });

  describe('Given no search criteria', () => {
    it('Then shows error message and disabled button', async () => {
      fixture.detectChanges();

      const errorElement = screen.getByText(/Search criteria is required!/i);
      const borrowButton = screen.getByText('Borrow');

      expect(errorElement).toBeInTheDocument();
      expect(borrowButton).toBeInTheDocument();
      expect(borrowButton).toBeDisabled();
    });
  });

  describe('Given a search criteria with no book match', () => {
    it('Then shows No book found', async () => {
      expect(await borrowButton.isDisabled()).toBeTruthy();

      await searchInput.setValue('fdjh');
      await borrowButton.click();

      const noBookElement = screen.getByText(/No book found for this search/i);

      expect(noBookElement).toBeInTheDocument();
      expect(await borrowButton.isDisabled()).toBeFalsy();
    });
  });

  describe('Given a search criteria with one book match', () => {
    it('Then shows One book and no error', async () => {
      expect(await borrowButton.isDisabled()).toBeTruthy();

      await searchInput.setValue('to kill');
      await borrowButton.click();

      const bookListItems = screen.getAllByRole('listitem');

      const foundBookItem = bookListItems.find((li) =>
        li.textContent?.includes('Borrowed Book: To Kill'),
      );

      expect(bookListItems.length).toBe(1);
      expect(foundBookItem).toBeInTheDocument();
      expect(
        screen.queryByText(/No book found for this search/i),
      ).not.toBeInTheDocument();
    });
  });

  describe('Given a search criteria in Uppercase with one book match', () => {
    it('Then shows One book and no error', async () => {
      expect(await borrowButton.isDisabled()).toBeTruthy();

      await searchInput.setValue('THE GREAT');
      await borrowButton.click();

      const bookListItems = screen.getAllByRole('listitem');

      const foundBookItem = bookListItems.find((li) =>
        li.textContent?.includes('Borrowed Book: The Great'),
      );

      expect(bookListItems.length).toBe(1);
      expect(foundBookItem).toBeInTheDocument();
      expect(
        screen.queryByText(/No book found for this search/i),
      ).not.toBeInTheDocument();
    });
  });

  describe('Given a search criteria with multple books matches', () => {
    it('Then shows a list of books', async () => {
      expect(await borrowButton.isDisabled()).toBeTruthy();

      await searchInput.setValue('THE');
      await borrowButton.click();

      const bookListItems = screen.getAllByRole('listitem');

      const foundOneBookItem = bookListItems.find((li) =>
        li.textContent?.includes('Borrowed Book: The Great'),
      );
      const foundAnotherBookItem = bookListItems.find((li) =>
        li.textContent?.includes('Borrowed Book: The Hobbit'),
      );

      expect(bookListItems.length).toBe(6);
      expect(foundOneBookItem).toBeInTheDocument();
      expect(foundAnotherBookItem).toBeInTheDocument();
      expect(
        screen.queryByText(/No book found for this search/i),
      ).not.toBeInTheDocument();
    });
  });
});
