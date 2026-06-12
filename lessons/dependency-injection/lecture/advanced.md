# Расширенные знания

## Переопределение сервиса на уровне компонента

Сервис с `providedIn: 'root'` можно переопределить на уровне компонента — тогда компонент получит собственный изолированный экземпляр вместо глобального синглтона. Этот экземпляр уничтожается вместе с компонентом.

[Ссылка на доку](https://angular.dev/guide/di/defining-dependency-providers#example-creating-component-specific-instances)

```ts
import {Injectable, Component, inject} from '@angular/core';

@Injectable({providedIn: 'root'})
export class DataStore {
  private data: ListItem[] = [];
}

@Component({
  selector: 'app-isolated',
  providers: [DataStore], // свой экземпляр, не root-синглтон
  template: `...`,
})
export class Isolated {
  dataStore = inject(DataStore); // Component-specific instance
}
```

---

## Модификаторы инъекции

По умолчанию `inject()` ищет зависимость снизу вверх по всему дереву инжекторов. Модификаторы позволяют **контролировать направление и обязательность** поиска.

[Ссылка на доку](https://angular.dev/guide/di/hierarchical-dependency-injection#modifying-service-visibility)

| Декоратор | Поведение |
|---|---|
| `@Self()` | Ищет только в инжекторе **текущего** компонента. Ошибка если не найдено. |
| `@SkipSelf()` | Пропускает текущий компонент, ищет **начиная с родителя**. |
| `@Host()` | Ищет до **host-компонента** включительно, дальше не идёт. |
| `@Optional()` | Не бросает ошибку если не найдено — возвращает `null`. |

Модификаторы комбинируются. Например, `@Optional() @Self()` означает «только в себе, но не обязательно»:

```ts
@Component({
  providers: [LocalService],
})
export class ParentComponent {
  // Есть провайдер — всё ок
  service = inject(LocalService, { self: true });
}

@Component({})
export class ChildComponent {
  // Нет провайдера в себе + optional → null, без ошибки
  service = inject(LocalService, { self: true, optional: true });
}
```

> В современном Angular вместо декораторов `@Self()` и т.д. рекомендуется передавать опции вторым аргументом в `inject()`: `inject(Token, { self: true, optional: true })`.

---

## Injection context и `runInInjectionContext`

`inject()` работает только в **injection context** — это поле класса (при инициализации) или конструктор. Вызов `inject()` внутри метода бросит ошибку в runtime.

[Ссылка на доку](https://angular.dev/guide/di/dependency-injection-context)

```ts
export class MyService {
  private router = inject(Router); // ✅ injection context — поле класса

  navigateSomewhere() {
    const router = inject(Router); // ❌ ошибка: не injection context
  }
}
```

Если нужно вызвать `inject()` вне контекста (например, в lazy-логике или в колбэке), используйте `runInInjectionContext`:

```ts
import {inject, Injector, runInInjectionContext} from '@angular/core';

export class MyService {
  private injector = inject(Injector);

  loadLazy() {
    runInInjectionContext(this.injector, () => {
      const http = inject(HttpClient); // ✅ внутри контекста
    });
  }
}
```

---

## Multi-providers (`multi: true`)

Позволяют зарегистрировать **несколько значений** под одним токеном. Angular собирает их в массив в порядке регистрации.

Именно так устроены встроенные механизмы Angular: `HTTP_INTERCEPTORS`, `APP_INITIALIZER`, `ENVIRONMENT_INITIALIZER`.

[Ссылка на доку](https://angular.dev/guide/di/dependency-injection-providers#using-an-injectiontoken-object)

```ts
export const PLUGIN_TOKEN = new InjectionToken<Plugin[]>('plugins');

// В провайдерах приложения (app.config.ts):
providers: [
  { provide: PLUGIN_TOKEN, useValue: analyticsPlugin, multi: true },
  { provide: PLUGIN_TOKEN, useValue: loggingPlugin,   multi: true },
]

// В компоненте или сервисе:
plugins = inject(PLUGIN_TOKEN); // [analyticsPlugin, loggingPlugin]
```

Без `multi: true` каждый следующий `provide` **перезаписал бы** предыдущий.

---

## `viewProviders` vs `providers`

Оба поля регистрируют провайдеры на уровне компонента, но отличаются видимостью для **projected content** (`<ng-content>`):

- **`providers`** — сервис доступен компоненту и его projected content
- **`viewProviders`** — сервис доступен только **собственному шаблону** компонента; projected content его не видит

[Ссылка на доку](https://angular.dev/guide/di/hierarchical-dependency-injection#providing-services-in-component)

```ts
@Component({
  selector: 'app-card',
  viewProviders: [CardService], // <ng-content> НЕ получит этот экземпляр
  template: `
    <div>
      <ng-content></ng-content> <!-- projected content не видит CardService -->
    </div>
  `,
})
export class CardComponent {}
```

Используйте `viewProviders` когда хотите, чтобы сервис был внутренней деталью компонента и не «утекал» наружу через слоты контента.

---

## Тестирование через DI

Тестируемость — **главный аргумент** в пользу DI. Поскольку зависимости явные и инжектируются снаружи, в тестах их легко заменить моками без изменения кода компонента.

```ts
describe('NavbarComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: { isLoggedIn: () => true } },
        { provide: Router,      useValue: { navigate: jest.fn() } },
      ],
    });
  });

  it('should navigate when logged in', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    // компонент получит моки вместо реальных сервисов
  });
});
```

Компонент ничего не знает о подмене — он просто вызывает `inject()` как обычно.

---

## APP_INITIALIZER — код до старта приложения

Самый частый реальный кейс multi-provider: выполнить асинхронную операцию **до** того, как Angular отрендерит первый компонент. Например, загрузить конфигурацию с сервера.

[Ссылка на доку](https://angular.dev/api/core/APP_INITIALIZER)

```ts
// config.service.ts
@Injectable({ providedIn: 'root' })
export class ConfigService {
  config: AppConfig | null = null;

  load() {
    return fetch('/assets/config.json')
      .then(r => r.json())
      .then(cfg => { this.config = cfg; });
  }
}

// app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (cfg: ConfigService) => () => cfg.load(),
      deps: [ConfigService],
      multi: true,
    },
  ],
};
```

Angular дождётся резолва промиса из фабрики и только потом запустит приложение. Если промис реджектится — приложение не загрузится.

> `APP_INITIALIZER` всегда `multi: true` — Angular сам собирает все инициализаторы и запускает их параллельно через `Promise.all`.

---

## Функциональная инъекция

Современный паттерн Angular 17+: вынести `inject()` в переиспользуемую функцию. Функция вызывается как **инициализатор поля класса** — это injection context, поэтому `inject()` внутри работает.

```ts
// inject-current-user.ts
export function injectCurrentUser() {
  const auth = inject(AuthService);
  return computed(() => auth.user());
}

// в любом компоненте или сервисе:
@Component({ ... })
export class ProfileComponent {
  currentUser = injectCurrentUser(); // inject() вызван в injection context
}

@Component({ ... })
export class NavbarComponent {
  currentUser = injectCurrentUser(); // тот же паттерн, без дублирования
}
```

Паттерн особенно полезен для логики, которая комбинирует несколько сервисов или сигналов — её можно протестировать отдельно через `TestBed.runInInjectionContext()`.

```ts
it('should return current user', () => {
  TestBed.configureTestingModule({
    providers: [{ provide: AuthService, useValue: mockAuth }],
  });

  const user = TestBed.runInInjectionContext(() => injectCurrentUser());
  expect(user()).toEqual(mockUser);
});
```

---

## Ссылки

- https://angular.dev/guide/di/hierarchical-dependency-injection
- https://angular.dev/guide/di/dependency-injection-context
- https://angular.dev/guide/di/dependency-injection-providers
- https://angular.dev/api/core/APP_INITIALIZER
