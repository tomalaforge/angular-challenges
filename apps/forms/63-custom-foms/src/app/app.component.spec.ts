import { TestBed } from '@angular/core/testing';
import { page, userEvent } from 'vitest/browser';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ReturnType<typeof TestBed.createComponent<AppComponent>>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  describe('When component is rendered', () => {
    it('Then should display headings and all form fields', async () => {
      await expect
        .element(page.getByRole('heading', { name: /order/i }))
        .toBeInTheDocument();
      await expect
        .element(page.getByRole('heading', { name: /information/i }))
        .toBeInTheDocument();
      await expect
        .element(page.getByRole('heading', { name: /shipping address/i }))
        .toBeInTheDocument();
      await expect
        .element(page.getByRole('heading', { name: /billing address/i }))
        .toBeInTheDocument();

      await expect
        .element(page.getByLabelText('Last name'))
        .toBeInTheDocument();
      await expect
        .element(page.getByLabelText('First name'))
        .toBeInTheDocument();
      await expect.element(page.getByLabelText('Street')).toBeInTheDocument();
      await expect.element(page.getByLabelText('ZIP code')).toBeInTheDocument();
      await expect.element(page.getByLabelText('City')).toBeInTheDocument();
      await expect
        .element(page.getByLabelText(/Billing address same as shipping/i))
        .toBeInTheDocument();
      await expect
        .element(page.getByTestId('billing-fields'))
        .toBeInTheDocument();
    });
  });

  describe('Given billing toggle', () => {
    it('Then billing fields hide when same-as-shipping is checked', async () => {
      await expect
        .element(page.getByTestId('billing-fields'))
        .toBeInTheDocument();

      await userEvent.click(
        page.getByLabelText(/Billing address same as shipping/i),
      );
      fixture.detectChanges();

      expect(
        fixture.nativeElement.querySelector('[data-testid="billing-fields"]'),
      ).toBeNull();
      expect(fixture.componentInstance.billing.disabled).toBe(true);
    });

    it('Then shipping values are copied into billing when locked', async () => {
      await userEvent.type(page.getByLabelText('Street'), '12 Flower Street');
      await userEvent.type(page.getByLabelText('ZIP code'), '75001');
      await userEvent.type(page.getByLabelText('City'), 'Paris');

      await userEvent.click(
        page.getByLabelText(/Billing address same as shipping/i),
      );
      fixture.detectChanges();

      expect(fixture.componentInstance.billing.getRawValue()).toEqual(
        fixture.componentInstance.shipping.getRawValue(),
      );
    });

    it('Then billing fields become editable again when unchecked', async () => {
      const checkbox = page.getByLabelText(/Billing address same as shipping/i);
      await userEvent.click(checkbox);
      await userEvent.click(checkbox);
      fixture.detectChanges();

      await expect
        .element(page.getByTestId('billing-fields'))
        .toBeInTheDocument();
      expect(fixture.componentInstance.billing.enabled).toBe(true);
    });
  });

  describe('Given validation', () => {
    it('Then marks all fields as required after submitting an empty form', async () => {
      await userEvent.click(page.getByRole('button', { name: /submit/i }));
      fixture.detectChanges();

      const requiredErrors = Array.from<HTMLElement>(
        fixture.nativeElement.querySelectorAll(
          '.hint',
        ) as NodeListOf<HTMLElement>,
      ).filter((el) => el.textContent?.includes('This field is required'));
      expect(requiredErrors.length).toBe(8);
    });
  });

  describe('Given a valid form with billing locked to shipping', () => {
    it('Then form is valid and status displays ready', async () => {
      await userEvent.type(page.getByLabelText('Last name'), 'Doe');
      await userEvent.type(page.getByLabelText('First name'), 'John');
      await userEvent.type(page.getByLabelText('Street'), '12 Flower Street');
      await userEvent.type(page.getByLabelText('ZIP code'), '75001');
      await userEvent.type(page.getByLabelText('City'), 'Paris');

      await userEvent.click(
        page.getByLabelText(/Billing address same as shipping/i),
      );
      fixture.detectChanges();

      expect(fixture.componentInstance.form.valid).toBe(true);
      await expect
        .element(page.getByText(/Ready to submit/i))
        .toBeInTheDocument();
    });
  });
});
