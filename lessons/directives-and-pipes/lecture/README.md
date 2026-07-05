## Как запустить

```bash
npm run serve:directives-and-pipes-lecture
```

## 1. Введение

**Директивы** — это классы, которые расширяют возможности HTML: меняют поведение, внешний
вид или саму структуру DOM. Делятся на три вида:

- **Компоненты** — директивы со своим шаблоном (частный случай директивы);
- **Атрибутивные** — меняют вид/поведение существующего элемента;
- **Структурные** — добавляют или удаляют элементы из DOM.

**Пайпы** — это трансформации данных прямо в шаблоне. Они не трогают DOM, а лишь
форматируют то, что выводится в интерполяции: `{{ value | pipeName:args }}`.

Ключевое отличие: **директивы меняют структуру/поведение элемента, пайпы — формат
отображения значения.**

---

## 2. Атрибутивные директивы

### 2.1. Встроенные атрибутивные директивы

Раздел: [default-attribute-directive](src/app/default-attribute-directive/).

Исторически для динамического стиля и классов использовались `[ngStyle]` и `[ngClass]`.
В современном Angular чаще достаточно нативных привязок `[style.*]` и `[class]` — в проекте
старый вариант оставлен закомментированным, а рабочим показан новый:

```html
<!-- было: [ngStyle] / [ngClass] -->
<h1 [style.color]="textColor()">ngStyle</h1>
<h1 [class]="className()">ngClass</h1>
```

Значения хранятся в сигналах, а кнопки меняют их через `signal.set()`:

```
public textColor = signal<string>('blue');
public setTextColor(color: string) {
  this.textColor.set(color);
}
```

### 2.2. Кастомная атрибутивная директива

Раздел: [custom-attribute-directive](src/app/custom-attribute-directive/).

Показаны три поколения одной и той же идеи — добавить элементу рамку:

1. **Статическая** через `ElementRef` + `Renderer2` (рабочий пример `[border]`):

   ```ts
   @Directive({ selector: '[border]' })
   export class BorderDirective {
     private readonly elementRef = inject(ElementRef);
     private readonly renderer = inject(Renderer2);
     constructor() {
       this.renderer.setStyle(this.elementRef.nativeElement, 'border', '1px solid #000');
     }
   }
   ```

2. **Динамическая на `@HostListener`** (`mouseenter` / `mouseleave`) — оставлена
   закомментированной как «классический» способ.

3. **Динамическая современная** через `host`-метаданные и сигнал `isHover`:

   ```ts
   @Directive({
     selector: '[hoverBorder]',
     host: {
       '[style.border]': `isHover() ? '1px solid #000' : 'none'`,
       '(mouseenter)': 'isHover.set(true)',
       '(mouseleave)': 'isHover.set(false)'
     }
   })
   export class BorderHoverDirective {
     readonly isHover = signal(false);
   }
   ```

   В комментариях также есть вариант с `input()`-алиасом, чтобы задавать цвет рамки снаружи.

---

## 3. Структурные директивы

### 3.1. Встроенные структурные директивы

Раздел: [default-structure-directive](src/app/default-structure-directive/).

Здесь показаны три классических сценария — в новом синтаксисе control flow и со старым
`*ngFor` для сравнения:

- **`@if`** — условный вывод (в коде также закомментирован вариант с `@else`):

  ```html
  @if (showSmile()) {
    <p>🤡</p>
  }
  ```

- **`@for` / `*ngFor`** — перебор коллекции. Используются `trackBy` (старый синтаксис) и
  `track` (новый), а также переменные `first` / `last` (`$first` / `$last`) для подсветки
  первого и последнего элемента:

  ```
  <div *ngFor="let student of students; trackBy: trackByFn; let isLast = last; let isFirst = first">
    <h2 [class.perfect]="isFirst" [class.disgusting]="isLast">{{ student.name }}: {{ student.grade }}</h2>
  </div>
  ```

- **`@switch`** — вывод по значению. На примере статуса заказа (`pending` / `shipped` /
  `delivered` / `cancelled` / `@default`):

  ```html
  @switch (orderStatus()) {
    @case ('shipped') { <div>🚚 Отправлен</div> }
    @default { <div>❓ Неизвестный статус</div> }
  }
  ```

### 3.2. Кастомная структурная директива

Раздел: [custom-structure-directive](src/app/custom-structure-directive/).

Директива `appRepeat` повторяет шаблон N раз — аналог упрощённого `*ngFor`. Ключевые
инструменты: `TemplateRef` (что повторять) и `ViewContainerRef` (куда вставлять).
Количество повторов приходит через `input` с алиасом, а пересборка вью происходит в `effect`:

```ts
@Directive({ selector: '[appRepeat]', standalone: true })
export class RepeatDirective {
  private templateRef = inject(TemplateRef);
  private viewContainer = inject(ViewContainerRef);
  readonly count = input(0, { alias: 'appRepeat' });

  constructor() {
    effect(() => {
      this.viewContainer.clear();
      for (let i = 0; i < (this.count() ?? 0); i++) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    });
  }
}
```

В шаблоне число привязано к `input[type=number]` через `ngModel`:

```html
<input type="number" [(ngModel)]="starCount" min="0" max="5">
<ng-template [appRepeat]="starCount">⭐</ng-template>
```

---

## 4. Пайпы

### 4.1. Зачем нужны пайпы

Раздел: [default-pipes](src/app/default-pipes/).

В компоненте намеренно показан *антипаттерн* — вызов метода прямо в шаблоне
(`{{ toUppercase('привет') }}`). Метод и пайп выводят в консоль `'отработал'`, и при любом
цикле обнаружения изменений метод пересчитывается заново. Закомментированный вариант с пайпом
`{{ 'привет' | toUpperCase }}` демонстрирует, что **чистый пайп вызывается только при изменении
входного значения** — а значит работает эффективнее.

```ts
@Pipe({ name: 'toUpperCase', pure: true })
export class ToUpperCasePipe implements PipeTransform {
  transform(value: string): string {
    console.log('отработал');
    return String(value).toUpperCase();
  }
}
```

### 4.2. Встроенные пайпы

В том же разделе собраны примеры стандартных пайпов из `@angular/common`:

- **`date`** — `{{ currentDate | date:'dd/MM/yyyy' }}`, `'fullDate'`, `'shortTime'`;
- **`uppercase` / `lowercase`** — смена регистра;
- **`currency`** — `{{ price | currency:'EUR':'symbol' }}`, `'RUB':'code'`;
- **`percent`** — `{{ rating | percent:'1.2-2' }}`.

**Параметризация и цепочки (chaining).** Пайпы принимают аргументы через `:` и объединяются
в цепочки слева направо:

```html
{{ currentDate | date:'fullDate' | uppercase }}
{{ sampleText | uppercase | lowercase }}
{{ price | currency:'USD':'code' | lowercase }}
```

**Чистые и нечистые пайпы.**

- **Pure (по умолчанию)** — пересчитывается только при изменении ссылки на входное значение.
- **Impure (`pure: false`)** — пересчитывается на каждом цикле обнаружения изменений; использовать
  осторожно из-за риска для производительности.

Кнопка «Зачем нужны Пайпы» в разделе обновляет сигнал-массив (`updateArray()`), что позволяет
наблюдать в консоли, когда именно срабатывает трансформация.

### 4.3. Кастомный пайп

Раздел: [custom-pipe](src/app/custom-pipe/).

Пайп `filterByProperties` — обобщённый фильтр коллекции по списку свойств. Применяется к списку
пользователей вместе с поиском по имени/email/городу:

```ts
@Pipe({ name: 'filterByProperties' })
export class FilterByPropertiesPipe implements PipeTransform {
  transform<T extends Record<string, any>>(
    items: T[] | null, searchText: string, properties: (keyof T)[]
  ): T[] {
    if (!items?.length || !searchText?.trim() || !properties?.length) return items ?? [];
    const lowerSearch = searchText.toLowerCase();
    return items.filter(item =>
      properties.some(prop => String(item[prop] ?? '').toLowerCase().includes(lowerSearch))
    );
  }
}
```

В шаблоне результат вычисляется через `@let` и фильтруется реактивно по мере ввода:

```html
@let filteredUsers = (users | filterByProperties: searchTerm : ['name', 'email', 'city']);
@for (user of filteredUsers; track user.id) {
  <li [highlightSearch]="searchTerm">{{ user.name }} ({{ user.email }})</li>
}
```

Дополнительно в этом же разделе работает директива `highlightSearch` — она через `effect`
оборачивает найденный текст в `<span style="background-color: yellow">`, подсвечивая совпадения.

---

## 5. Важные нюансы

- **Не вызывайте методы в шаблоне** для форматирования — используйте пайпы (см. §4.1).
- **Избегайте impure-пайпов с тяжёлыми вычислениями** — они пересчитываются на каждый CD-цикл.
- Нужно **поменять DOM или поведение элемента** → директива.
- Нужно **отформатировать данные для отображения** → пайп.
- Нужна **сложная бизнес-логика** → компонент / сервис.
- **`async` pipe** — отдельно стоит упомянуть: автоматически подписывается на `Observable`/`Promise`
  и отписывается при уничтожении компонента.

