import { render } from '@testing-library/angular';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  describe('When clicking 2 times on plus button of first slider', () => {
    test('Then value is 16', async () => {
      await render(AppComponent);
    });
  });

  describe('When clicking 1 time on plus button and two times on minus button of first slider', () => {
    test('Then value is still 10', async () => {
      await render(AppComponent);
    });
  });

  describe('When clicking 4 times on plus button of slider 1', () => {
    test('Then slider 2 is enabled', async () => {
      await render(AppComponent);
    });
  });
});
