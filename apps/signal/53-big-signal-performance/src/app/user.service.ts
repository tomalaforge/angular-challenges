import { Injectable, computed, signal } from '@angular/core';

interface Address {
  street: string;
  zipCode: string;
  city: string;
}

@Injectable({ providedIn: 'root' })
export class UserStore {
  // Split into separate signals
  private readonly nameSignal = signal('Bob');
  private readonly addressSignal = signal<Address>({
    street: '',
    zipCode: '',
    city: '',
  });
  private readonly noteSignal = signal('');
  private readonly jobSignal = signal({
    title: '',
    salary: 0,
  });

  // Computed getters for components
  readonly name = computed(() => this.nameSignal());
  readonly address = computed(() => this.addressSignal());
  readonly note = computed(() => this.noteSignal());
  readonly job = computed(() => this.jobSignal());

  // Update methods
  updateName(name: string) {
    this.nameSignal.set(name);
  }

  updateAddress(address: Address) {
    this.addressSignal.set(address);
  }

  updateNote(note: string) {
    this.noteSignal.set(note);
  }

  updateJob(title: string, salary: number) {
    this.jobSignal.update((job) => ({ ...job, title, salary }));
  }
}
