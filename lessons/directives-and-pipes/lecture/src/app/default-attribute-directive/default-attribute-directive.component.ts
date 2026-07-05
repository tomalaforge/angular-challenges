import {Component, signal} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-default-attribute-directive',
  imports: [CommonModule],
  templateUrl: './default-attribute-directive.html',
  styleUrl: './default-attribute-directive.css',
})
export class DefaultAttributeDirective {
  public textColor = signal<string>('blue');
  public className = signal<string>('title');

  public setTextColor(color: string) {
    this.textColor.set(color);
  }

  public setClassName(name: string) {
    this.className.set(name);
  }
}
