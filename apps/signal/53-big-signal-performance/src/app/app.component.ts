import { Component } from '@angular/core';
import { AddressComponent } from './address.component';
import { JobComponent } from './job.component';
import { NameComponent } from './name.component';
import { NoteComponent } from './note.component';
import { UserFormComponent } from './user-form.component';
import { UserStore } from './user.service';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <name />
    <address-user />
    <job />
    <note />
    <user-form />
  `,
  styles: [''],
  imports: [
    JobComponent,
    NameComponent,
    AddressComponent,
    NoteComponent,
    UserFormComponent,
  ],
  providers: [UserStore],
})
export class AppComponent {}
