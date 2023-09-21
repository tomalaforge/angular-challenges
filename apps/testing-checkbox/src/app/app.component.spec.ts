import { render } from '@testing-library/angular';
import { AppComponent } from './app.component';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';
import { ComponentFixture } from '@angular/core/testing';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let user: UserEvent;

  beforeEach(async () => {
    fixture = (await render(AppComponent)).fixture;
    user = userEvent.setup();
  });

  describe('When checking the checkbox', () => {
    it('Then button is enabled', async () => {
      const checkbox = screen.getByTestId('checkbox') as HTMLInputElement;
      const btn = screen.getByRole('button');

      expect(checkbox).not.toBeChecked();
      expect(btn).toBeDisabled();

      screen.debug(checkbox);
      await user.click(checkbox);
      screen.debug(checkbox);

      expect(checkbox).toBeChecked();
      expect(btn).toBeEnabled();
    });
  });
});
