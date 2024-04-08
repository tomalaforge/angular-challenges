import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { StringSeperatorPipe } from './shared/pipe/string-seperator.pipe';

@Component({
  standalone: true,
  imports: [NgFor, StringSeperatorPipe],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  persons = ['toto', 'jack', 'todo23', 'jask2'];
}
