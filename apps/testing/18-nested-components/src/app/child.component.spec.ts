import { render, screen } from '@testing-library/angular';
import { createMockWithValues } from '@testing-library/angular/jest-utils';
import userEvent from '@testing-library/user-event';
import { ChildComponent } from './child.component';
import { HttpService } from './http.service';

describe('ChildComponent', () => {
  async function setup() {
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
  }

  describe('When typing nothing and clicking on Validate', () => {
    test('Then show "Title is required" error message and no http request has been sent', async () => {
      // Arrange
      const { httpServiceMock } = await setup();

      // Act
      await userEvent.click(
        screen.getByRole('button', {
          name: /validate/i,
        }),
      );

      // Assert
      expect(screen.queryByText(/title is required/i)).toBeInTheDocument();
      expect(httpServiceMock.sendTitle).not.toHaveBeenCalled();
    });
  });

  describe('When typing "Good" and clicking on Validate', () => {
    test('Then show "Title is Good" message, no error message and send a http request to the backend', async () => {
      // Arrange
      const { httpServiceMock } = await setup();

      // Act
      await userEvent.type(screen.getByRole('textbox'), 'Good');
      await userEvent.click(
        screen.getByRole('button', {
          name: /validate/i,
        }),
      );

      // Assert
      expect(screen.queryByText(/title is required/i)).not.toBeInTheDocument();
      expect(httpServiceMock.sendTitle).toHaveBeenCalledWith('Good');
    });
  });
});
