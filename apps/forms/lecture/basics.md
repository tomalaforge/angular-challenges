## Template driven forms
Это подход при котором логика формы, типы контролов, валидаторы и тд описываются в шаблоне, практически без использования TypeScript. Возьмем пример

```typescript
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'login',
  styles: `
    input {
        border: 1px solid #ddd;
        padding: 5px 15px;
        border-radius: 5px;
        display: block;
        margin-bottom: 5px;
    }

    .error {
        font-size: 12px;
        color: red;
    }
  `,
  standalone: true,
  imports: [FormsModule],
  template: `
    <form #form="ngForm" (ngSubmit)="onSubmit(form)">
      <input
        name="email"
        [(ngModel)]="model.email"
        required
        email
        #emailField="ngModel"
      />
      @if (emailField.invalid && emailField.touched) {
          <p class="error">Введите корректный email</p>
      }

      <input
        name="password"
        type="password"
        [(ngModel)]="model.password"
        required
        minlength="8"
      />

      <button type="submit" [disabled]="form.invalid">Войти</button>
    </form>
  `,
})
export class LoginComponent {
  model = { email: '', password: '' };

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log(form.value); // { email: '...', password: '...' }
    }
  }
}

```

Здесь нужно обратить внимание на следующее:
1. Доступ к форме у нас происходит через шаблонную переменную `#form`
2. Доступ к форм-контролам у на спроисходит так же, через шаблонные переменные, например `emailField`. Таким образом можно получать статус валидности контрола, ошибки и тд
3. Атрибут name на форм-контроле обязатален - Angular использует его как ключ в объекте формы.
4. Правила валидации каждого форм-контрола мы указываем как атрибут dom-элемента. Например на контроле пароля это required и minLength, а на контроле почты - это email. Ангуляр под капотом автоматически навешивает стандартные функции валидации
Такой подход хорош для простых форм. Простых как по структуре так и по логике. Но когда все становится сложнее, то такими формами крайне недобно управлять, расширять их, обвешивать всякой доп. логикой. Например при таком подходе будет крайне неудобно программно установить значение в контрол. Это в принципе возможно сделать, через viewChild, но придется писать много кода, по сути не особо то нужного.  Плюсом к этому, чтобы получить контрол через viewChild вам сначала нужно дождаться полного рендера формы, соотв ДО рендера, ничего сделать не получится, а часто это нужно.

Чтобы убедиться в хрупкости такого подхода, вот вам задача:
1. После инициализации формы, нужно выждать 3 секунды и установить в контрол почты значение `lazy-value@mymail.ru`
## Reactive forms
Реактивный подход к построению форм немного другой: сначала описываешь в TS структуру формы, правила валидации а потом к этой форме и форм-контролам привязываешь дом-элементы.

Angular предоставляет три класса для построения модели формы. Все они наследуются от `AbstractControl`:


```
AbstractControl
├── FormControl — одно поле
├── FormGroup — группа полей (объект)
└── FormArray — массив полей
```

Думайте об этом как о структуре данных: `FormGroup` — это объект, `FormArray` — массив, `FormControl` — примитив. Любую форму можно описать их комбинацией.

### FormGroup & FormControl
1. Описываем форму через классы FormGroup и FormControl
2. Привязываем форм-контролы к дом-элементам через директивы formGroup и formControlName

```typescript
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <input formControlName="email" placeholder="Email" />
      <input formControlName="password" type="password" placeholder="Пароль" />
      <button type="submit" [disabled]="form.invalid">Войти</button>
    </form>
  `
})
export class ReactiveLoginComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  // Геттеры — чтобы не писать this.form.controls.email везде
  get email()    { return this.form.controls.email; }
  get password() { return this.form.controls.password; }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      // { email: 'user@example.com', password: 'secret123' }
    }
  }
}
```

Если сравнить с прошлым подходом, то видно что из HTML ушло много лишней информации, стало поменьше магии. Теперь у нас остались просто привязки контролов к дом-элементам. Плюс ко всему мы можем сконфигурировать форму и менять ее ДО рендеринга HTML, что было невозможно в подходе Template driven.

Валидаторы больше не описываются в HTML, они описываются функциями в TS. 

До v14 значения форм было нетипизированным и это доставляло много проблем, начиная с Angular v14 эту проблему исправили и теперь крайне рекомендуется типизировать значения форм-контролов

```ts
const form = new FormGroup({
    age: new FormControl<number>(0),
    name: new FormControl<string>(''),
});
```



### FormArray
Часто бывают случаи, когда набор вашей формы меняется пользователем в рантайме. Например когда пользователь указывает несколько телефонов для связи. Если при таком кейсе использовать FormGroup то пришлось бы как то вручную управлять добавлением контролов в группу, удалением их оттуда и тд. Можно, но неэффективно и неудобно. Для таких задач существует FormArray

```ts
@Component({
  template: `
    <form [formGroup]="form">
      <div formArrayName="phones">
        @for (phone of phones.controls; track $index) {
          <div>
            <input [formControlName]="$index" placeholder="Телефон {{ $index + 1 }}" />
            <button (click)="removePhone($index)">✕</button>
          </div>
        }
      </div>
      <button (click)="addPhone()">+ Добавить телефон</button>
    </form>
  `
})
export class ContactFormComponent {
  form = new FormGroup({
    name:   ['', Validators.required],
    phones: new FormArray([new FormControl('')]),
  });

  get phones() {
    return this.form.controls.phones;
  }

  addPhone() {
    this.phones.push(new FormControl(''));
  }

  removePhone(index: number) {
    this.phones.removeAt(index);
  }
}
```

Обратите внимание: в шаблоне `formArrayName="phones"` указывает Angular где искать массив, а `[formControlName]="i"` — привязка по числовому индексу, а не по имени.
У FormArray для управления коллекцией уже есть встроенные методы:
- push
- removeAt
- insert
Следует использовать именно их, для добавления или удаления контролов

## Обработка значения контролов и формы
Так как и FormControl и FormGroup унаследованы от класса AbstractControl то АПИ по работе со значениями одинаков:
- setValue() - установка нового значения
- patchValue() - установка значения конкретного поля формы
- reset() - сброс значения формы
Как правило вы будете устанавливать значения конкретьного контрола через форму, а не напрямую через конкретный FormControl. Например вернемся к нашей прошлой форме логина
```ts
form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

form.setValue({ email: 'a@b.com', password: '123' }); 
form.patchValue({ email: 'a@b.com' });
```

- `setValue` требует передать значения для **всех** полей группы, иначе выбросит ошибку.
- `patchValue` обновляет только те поля, которые вы передали. На практике `patchValue` используется чаще — например, когда вы заполняете форму данными с сервера, где могут быть не все поля.
Одно из самых главных преимуществ реактивного построения форм - это подписка на изменения контролов. Реактивные формы — это Observable. Каждый `FormControl` и `FormGroup` предоставляет два потока: `valueChanges` и `statusChanges`. Вы можете подписаться на них и реагировать на любые изменения.
```typescript
// Реагируем на изменение конкретного поля
this.form.controls.email.valueChanges.subscribe(value => {
  console.log('email changed:', value);
});

// Реагируем на любое изменение в форме
this.form.valueChanges.subscribe(formValue => {
  console.log('form changed:', formValue);
});

// Реагируем на изменение статуса (valid/invalid/pending)
this.form.statusChanges.subscribe(status => {
  // 'VALID' | 'INVALID' | 'PENDING' | 'DISABLED'
});
```

Раз у нас valueChanges это поток (Observable) то мы можем использовать весь арсенал RxJS-операторов для обработки: фильтровать (filter), комбинировать значения вместе (combineLatest) и тд, в зав-ти от задачи

## Валидация
Angular предоставляет набор готовых валидаторов в классе `Validators`:

```typescript
import { Validators } from '@angular/forms';

Validators.required          // поле не должно быть пустым
Validators.email             // валидный email
Validators.minLength(n)      // минимальная длина строки
Validators.maxLength(n)      // максимальная длина строки
Validators.min(n)            // минимальное числовое значение
Validators.max(n)            // максимальное числовое значение
Validators.pattern(regexp)   // соответствие регулярному выражению
Validators.nullValidator     // всегда валидно (заглушка)
```

Несколько валидаторов передаются массивом — Angular применяет их все и объединяет ошибки:

```typescript
new FormControl('', [Validators.required, Validators.email, Validators.maxLength(100)])
```

Встроенных валидаторов часто недостаточно, но в Ангуляре можно создать свой валидатор очень просто. Это обычная функция с чётко определённой сигнатурой.

Валидатор принимает `AbstractControl` и возвращает либо объект с ошибками, либо `null` если всё хорошо. Ключи объекта ошибок — это то, что вы будете проверять через `ctrl.errors?.['ERROR_KEY']`.

```typescript
import { AbstractControl, ValidationErrors } from '@angular/forms';

// Простой валидатор-функция
function noSpaces(control: AbstractControl): ValidationErrors | null {
  if (control.value?.includes(' ')) {
    return { noSpaces: true }; // ключ ошибки - noSpaces
  }
  return null; // всё хорошо, значение валидно
}

// Валидатор-фабрика — принимает параметры и возвращает функцию-валидатор
function forbiddenValue(forbidden: string) {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value === forbidden) {
      return { forbiddenValue: { value: control.value } };
    }
    return null;
  };
}

// Использование
const ctrl = new FormControl('', [
  Validators.required,
  noSpaces,
  forbiddenValue('admin'),
]);
```

Заметьте разницу: `noSpaces` передаётся как ссылка на функцию, а `forbiddenValue('admin')` — вызывается и возвращает функцию. Это стандартный паттерн: когда валидатору нужны параметры, он реализуется как фабрика.
## Статусы формы и контролов
Каждый `FormControl` — это не просто хранилище значения. Это полноценный объект состояния, который отслеживает историю взаимодействия пользователя с полем.

```typescript
const ctrl = new FormControl('');

// Статус валидации
ctrl.valid    // true если все валидаторы прошли
ctrl.invalid  // !valid
ctrl.pending  // true если асинхронный валидатор ещё работает
ctrl.disabled // поле отключено

// История взаимодействия
ctrl.pristine // пользователь ещё ни разу не менял значение
ctrl.dirty    // пользователь хоть раз изменил значение
ctrl.touched  // пользователь покинул поле (сработал blur)
ctrl.untouched

// Данные
ctrl.value    // текущее значение
ctrl.errors   // { required: true } | null
```

Зачем нам нужны `touched` и `dirty`? Представьте: пользователь только что открыл форму. Все поля пустые — значит, `required` сразу показывает ошибки. Но показывать ошибки до того, как пользователь вообще попытался что-то заполнить — плохой UX. Поэтому стандартный паттерн: показывать ошибки только после `touched` (пользователь посетил поле и ушёл).

Как используется:
```html
@if (email.invalid && email.touched) {
  <div>Введите корректный email</div>
}

<!-- Плохо: ошибка сразу при загрузке страницы -->
@if (email.invalid) {
  <div>Введите корректный email</div>
}
```

Но это еще не всё! Angular автоматически добавляет и убирает CSS-классы на элементе формы, отражая его состояние. Вам не нужно делать это вручную:

```
ng-valid / ng-invalid
ng-pristine / ng-dirty
ng-touched / ng-untouched
```

Это позволяет стилизовать поля декларативно:

```css
/* Красная рамка только на полях, которые пользователь тронул и заполнил неверно */
input.ng-invalid.ng-touched {
  border-color: red;
}

/* Зелёная рамка для корректно заполненных полей */
input.ng-valid.ng-dirty {
  border-color: green;
}
```
