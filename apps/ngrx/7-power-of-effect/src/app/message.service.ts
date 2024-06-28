import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class MessageService {
  #matSnackBar = inject(MatSnackBar);

  showMessage(message: string) {
    this.#matSnackBar.open(message);
  }
}
