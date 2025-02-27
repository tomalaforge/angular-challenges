import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DialogBackButtonStrategy } from '../dialog-strategy.interface';

@Injectable({ providedIn: 'root' })
export class SimpleDialogStrategy implements DialogBackButtonStrategy {
  handleBackButton(dialogRef: MatDialogRef<unknown>): Observable<boolean> {
    return of(false).pipe(tap(() => dialogRef.close()));
  }
}
