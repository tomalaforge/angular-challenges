import { render } from '@testing-library/angular';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  test('error modal is displayed if you click on "Confirm" without inputing a name', async () => {
    await render(AppComponent);
  });

  test('error message is shown if you click "Cancel" in the confirmation modal after submitting a name', async () => {
    await render(AppComponent);
  });

  test('confirm message is shown if you click "Confirm" in the confirmation modal after submitting a name', async () => {
    await render(AppComponent);
  });
});
