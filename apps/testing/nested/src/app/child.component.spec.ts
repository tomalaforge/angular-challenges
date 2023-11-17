import { userEvent } from '@testing-library/user-event';
import { render, screen } from '@testing-library/angular';
import { ChildComponent } from './child.component';
import { createMockWithValues } from '@testing-library/angular/jest-utils';
import { HttpService } from './http.service';

describe('ChildComponent', () => {
  const setup = async () => {
    const httpServiceMock = createMockWithValues(HttpService, {
      sendTitle: jest.fn(),
    });
    await render(ChildComponent, {
      componentProviders: [
        {
          provide: HttpService,
          useValue: httpServiceMock,
        },
      ],
    });
    return { httpServiceMock };
  };
  describe('When typing nothing and clicking on Validate', () => {
    test('Then show "Title is required" error message and no http request has been sent', async () => {
      const { httpServiceMock } = await setup();
      const validateButton = await  screen.getByRole('button', {
        name: /validate/i,
      });
      const textBox = await screen.getByRole('textbox');
      await userEvent.clear(textBox);
      await userEvent.click(validateButton);
      expect(await screen.queryByText('Title is required !!!')).toBeInTheDocument();
      expect(httpServiceMock.sendTitle).not.toHaveBeenCalled();
    });
  });

  describe('When typing "Good" and clicking on Validate', () => {
    test('Then show "Title is Good" message, no error message and send a http request to the backend', async () => {
      const { httpServiceMock } = await setup();
      const validateButton = await screen.getByRole('button', {
        name: /validate/i,
      });
      const textBox = await screen.getByRole('textbox');
      await userEvent.clear(textBox);
      await userEvent.type(textBox, 'Good');
      expect(await screen.queryByText('Title is Good')).toBeInTheDocument();
      await userEvent.click(validateButton);
      expect(httpServiceMock.sendTitle).toHaveBeenCalled();
    });
  });
});
