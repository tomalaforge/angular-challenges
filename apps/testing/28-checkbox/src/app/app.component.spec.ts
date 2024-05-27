import { prettyDOM, render, screen } from '@testing-library/angular';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  describe('On init', () => {
    it('The toggle checkbox should be in the DOM', async () => {
      await render(AppComponent);

      screen.debug();
    });

    it('test debug function with an element', async () => {
      await render(AppComponent);

      screen.debug(screen.getByText('Agreed'));
    });

    it('test prettyDOM log', () => {
      const div = document.createElement('div');
      div.innerHTML = '<div><h1>Hello World</h1></div>';
      console.log(prettyDOM(div));
    });
  });
  describe('When checking the checkbox', () => {
    it('Then button is enabled', async () => {
      await render(AppComponent);
    });
  });
});
