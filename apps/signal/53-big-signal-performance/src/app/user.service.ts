import { computed, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserStore {
  user = signal({
    name: 'Bob',
    address: {
      street: '',
      zipCode: '',
      city: '',
    },
    note: '',
    title: '',
    salary: 0,
  });

  userName = computed(() => this.user().name);
  userAddress = computed(() => this.user().address);
  userAddressStreet = computed(() => this.user().address.street);
  userAddressZipCode = computed(() => this.user().address.zipCode);
  userAddressCity = computed(() => this.user().address.city);
  userNote = computed(() => this.user().note);
  userTitle = computed(() => this.user().title);
  userSalary = computed(() => this.user().salary);
}
