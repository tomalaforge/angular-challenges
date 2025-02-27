import { computed, Injectable, signal } from '@angular/core';
import { products } from './products';

@Injectable({ providedIn: 'root' })
export class OrderStateService {
  private readonly productIdSignal = signal<string>('1');
  private readonly quantitySignal = signal<number>(1);

  readonly product = computed(() =>
    products.find((p) => p.id === this.productIdSignal()),
  );

  readonly quantity = computed(() => this.quantitySignal());

  readonly totalWithoutVat = computed(
    () => (this.product()?.price ?? 0) * this.quantity(),
  );

  readonly vat = computed(() => this.totalWithoutVat() * 0.21);
  readonly total = computed(() => this.totalWithoutVat() + this.vat());

  updateProductId(id: string) {
    this.productIdSignal.set(id);
  }

  updateQuantity(quantity: number) {
    this.quantitySignal.set(quantity);
  }
}
