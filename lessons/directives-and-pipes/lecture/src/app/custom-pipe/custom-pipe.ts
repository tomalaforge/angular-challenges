import { Component, Directive, effect, ElementRef, inject, input, Pipe, PipeTransform } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Directive({
  selector: '[highlightSearch]',
  standalone: true
})
export class HighlightSearchDirective {
  private readonly el = inject(ElementRef);
  readonly highlightSearch = input<string>();

  constructor() {
    effect(() => {
      const text = this.el.nativeElement.textContent;

      if (!this.highlightSearch) {
        this.el.nativeElement.innerHTML = text;
        return;
      }

      const regex = new RegExp(this.highlightSearch() || '', 'gi');


      this.el.nativeElement.innerHTML = text.replace(regex, (match: string) => {
        return `<span style="background-color: yellow;">${match}</span>`;
      });
    });
  }
}

@Pipe({
  name: 'filterByProperties',
})
export class FilterByPropertiesPipe implements PipeTransform {
  transform<T extends Record<string, any>>(
    items: T[] | null,
    searchText: string,
    properties: (keyof T)[]
  ): T[] {
    if (!items || !Array.isArray(items)) return [];
    if (!searchText || searchText.trim() === '') return items;
    if (!properties || properties.length === 0) return items;

    const lowerSearch = searchText.toLowerCase();

    return items.filter(item => {
      return properties.some(prop => {
        const value = item[prop];
        if (value == null) return false;
        return String(value).toLowerCase().includes(lowerSearch);
      });
    });
  }
}

@Component({
  imports: [
    FormsModule,
    FilterByPropertiesPipe,
    HighlightSearchDirective
  ],
  templateUrl: './custom-pipe.html',
})
export class CustomPipe {
  searchTerm = '';

  users = [
    { id: 1, name: 'Иван Петров', email: 'ivan@example.com', city: 'Москва' },
    { id: 2, name: 'Мария Сидорова', email: 'maria@example.com', city: 'СПб' },
    { id: 3, name: 'John Doe', email: 'john@example.com', city: 'New York' },
    { id: 4, name: 'Анна Смит', email: 'anna@example.com', city: 'Москва' },
    { id: 5, name: 'Иван Петрович', email: 'ivan1@example.com', city: 'Москва' },
    { id: 6, name: 'Мария Сидоровенко', email: 'maria1@example.com', city: 'Москва' },
    { id: 7, name: 'John Doewwq', email: 'john1@example.com', city: 'New York' },
    { id: 8, name: 'Анна Ивановна', email: 'anna1@example.com', city: 'Москва' },
    { id: 9, name: 'Иван Михеев', email: 'ivan2@example.com', city: 'Москва' },
    { id: 10, name: 'Мария Емельянова', email: 'maria2@example.com', city: 'СПб' },
    { id: 11, name: 'Jon Smith', email: 'john2@example.com', city: 'New York' },
    { id: 12, name: 'Анна Лисичкина>', email: 'anna2@example.com', city: 'Москва' },
    { id: 13, name: 'Иван Петров', email: 'ivan3@example.com', city: 'Москва' },
    { id: 14, name: 'Мария Сидоро', email: 'maria3@example.com', city: 'СПб' },
    { id: 15, name: 'John Doedqwq', email: 'john3@example.com', city: 'New York' },
    { id: 16, name: 'Вадим Смит', email: 'anna3@example.com', city: 'Москва' },
  ];
}
