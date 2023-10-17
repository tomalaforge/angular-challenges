import { render } from '@testing-library/angular';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  describe('When checking the checkbox', () => {
    it('Then button is enabled', async () => {
      await render(AppComponent);
    });
  });
});
