# Service Abstraction — Challenge

## Контекст

В приложении два контекста: официальный (formal) и неформальный (casual).
Оба используют `GreetingService`, но реализация должна быть разной.

## Задача

Созданы два конкретных сервиса, расширяющих абстрактный класс:
- `FormalGreetingService` — официальные приветствия
- `CasualGreetingService` — неформальные приветствия

Заполни `providers` в каждом компоненте через `useClass` так, чтобы:
- `FormalPanelComponent` использовал `FormalGreetingService`
- `CasualPanelComponent` использовал `CasualGreetingService`

## Почему абстрактный класс, а не интерфейс?

TypeScript-интерфейсы не существуют в runtime — их нельзя использовать как DI-токен.
Абстрактный класс компилируется в реальный JavaScript-класс и может служить токеном.

## Ограничения

- Нельзя изменять `greeting.service.ts` и `app.component.ts`
- Только `formal-panel.component.ts` и `casual-panel.component.ts`

## Запуск

```
npm run serve:angular-service-abstraction
```
