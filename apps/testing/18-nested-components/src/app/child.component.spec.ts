import { render, screen } from '@testing-library/angular';
import { createMock } from '@testing-library/angular/jest-utils';
import userEvent from '@testing-library/user-event';
import {
  ButtonComponent,
  ChildComponent,
  ErrorComponent,
  InputComponent,
  ResultComponent,
} from './child.component';
import { HttpService } from './http.service';

async function setup() {
  const httpServiceMock = createMock(HttpService);
  httpServiceMock.sendTitle = jest.fn();

  await render(ChildComponent, {
    imports: [ResultComponent, ButtonComponent, InputComponent, ErrorComponent],
    providers: [{ provide: HttpService, useValue: httpServiceMock }],
  });

  return { httpServiceMock };
}

describe('ChildComponent', () => {
  describe('When typing nothing and clicking on Validate', () => {
    test('Then show "Title is required" error message and no http request has been sent', async () => {
      const { httpServiceMock } = await setup();

      expect(
        screen.queryByText(/Title is required !!!/i),
      ).not.toBeInTheDocument();

      const validateButton = screen.getByRole('button', { name: /Validate/i });

      await userEvent.click(validateButton);

      expect(screen.queryByText(/Title is required !!!/i)).toBeInTheDocument();
      expect(httpServiceMock.sendTitle).not.toHaveBeenCalled();
    });
  });

  describe('When typing "Good" and clicking on Validate', () => {
    test('Then show "Title is Good" message, no error message and send a http request to the backend', async () => {
      const { httpServiceMock } = await setup();

      const titleControl = screen.getByRole('textbox');
      const validateButton = screen.getByRole('button', { name: /Validate/i });

      await userEvent.type(titleControl, 'Good');
      await userEvent.click(validateButton);

      expect(titleControl).toBeInTheDocument();
      expect(
        screen.queryByText(/Title is required !!!/i),
      ).not.toBeInTheDocument();
      expect(screen.queryByText(/Title is Good/i)).toBeInTheDocument();
      expect(httpServiceMock.sendTitle).toHaveBeenCalled();
      expect(httpServiceMock.sendTitle).toHaveBeenCalledTimes(1);
      expect(httpServiceMock.sendTitle).toHaveBeenCalledWith('Good');
    });
  });
});
