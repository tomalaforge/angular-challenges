import { TestBed } from '@angular/core/testing';
import { page, userEvent } from 'vitest/browser';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    TestBed.createComponent(AppComponent);
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
      const billingFields = page.getByTestId('billing-fields');

      await expect.element(billingFields).toBeInTheDocument();

      const billingCheckbox = page.getByLabelText(
        /Billing address same as shipping/i,
      );
      await userEvent.click(billingCheckbox);

      await expect.element(billingFields).not.toBeInTheDocument();
      await expect.element(billingCheckbox).toBeChecked();
    });

    it('Then shipping values are copied into billing when locked', async () => {
      const shippingFields = page.getByTestId('shipping-fields');
      await userEvent.type(
        shippingFields.getByLabelText('Street'),
        '12 Flower Street',
      );
      await userEvent.type(shippingFields.getByLabelText('ZIP code'), '75001');
      await userEvent.type(shippingFields.getByLabelText('City'), 'Paris');

      const billingCheckbox = page.getByLabelText(
        /Billing address same as shipping/i,
      );
      await userEvent.click(billingCheckbox);
      await userEvent.click(billingCheckbox);

      const billingFields = page.getByTestId('billing-fields');
      await expect.element(billingFields).toBeInTheDocument();
      await expect
        .element(billingFields.getByLabelText('Street'))
        .toHaveValue('12 Flower Street');
      await expect
        .element(billingFields.getByLabelText('ZIP code'))
        .toHaveValue('75001');
      await expect
        .element(billingFields.getByLabelText('City'))
        .toHaveValue('Paris');
    });

    it('Then billing fields become editable again when unchecked', async () => {
      const billingCheckbox = page.getByLabelText(
        /Billing address same as shipping/i,
      );
      await userEvent.click(billingCheckbox);
      await userEvent.click(billingCheckbox);

      const billingFields = page.getByTestId('billing-fields');

      await expect.element(billingFields).toBeInTheDocument();
      await expect
        .element(billingFields.getByLabelText('Street'))
        .toBeEnabled();
      await expect
        .element(billingFields.getByLabelText('ZIP code'))
        .toBeEnabled();
      await expect.element(billingFields.getByLabelText('City')).toBeEnabled();
    });
  });

  describe('Given validation', () => {
    it('Then marks all fields as required after submitting an empty form', async () => {
      await userEvent.click(page.getByRole('button', { name: /submit/i }));

      const errorMessages = page.getByText('Field is required');

      expect(errorMessages).toHaveLength(8);
    });
  });

  describe('Given a valid form with billing locked to shipping', () => {
    it('Then form is valid and status displays ready', async () => {
      await userEvent.type(page.getByLabelText('Last name'), 'Doe');
      await userEvent.type(page.getByLabelText('First name'), 'John');

      const shippingFields = page.getByTestId('shipping-fields');
      await userEvent.type(
        shippingFields.getByLabelText('Street'),
        '12 Flower Street',
      );
      await userEvent.type(shippingFields.getByLabelText('ZIP code'), '75001');
      await userEvent.type(shippingFields.getByLabelText('City'), 'Paris');

      const billingCheckbox = page.getByLabelText(
        /Billing address same as shipping/i,
      );
      await userEvent.click(billingCheckbox);

      await expect
        .element(page.getByRole('button', { name: /submit/i }))
        .toBeEnabled();
      await expect
        .element(page.getByText(/Ready to submit/i))
        .toBeInTheDocument();
    });
  });
});
