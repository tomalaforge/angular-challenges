import { Component, signal } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  template: `
    <button [routerLink]="'default-attribute-directive'">Встроенные атрибутивные директивы</button>
    <button [routerLink]="'custom-attribute-directive'">Кастомная атрибутивная директива</button>
    <button [routerLink]="'default-structure-directive'">Встроенные структурные директивы</button>
    <button [routerLink]="'custom-structure-directive'">Кастомная структурная директива</button>
    <button [routerLink]="'default-pipes'">Дефолтные пайпы</button>
    <button [routerLink]="'custom-pipe'">Кастомный пайп</button>
    <router-outlet />
  `,
})
export class App {}
