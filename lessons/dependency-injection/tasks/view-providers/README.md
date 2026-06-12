# viewProviders vs providers — Challenge

## Проблема

`CardComponent` управляет своей цветовой темой через `ThemeService`.
Сервис предоставляется через `providers: [ThemeService]`.

Нажми кнопку **Change color** и посмотри на результат:
**блок внутри карточки (projected content) тоже меняет цвет** — хотя не должен.

Это происходит потому что `providers` делает сервис доступным и для `<ng-content>` —
projected content получает экземпляр ThemeService карточки вместо своего собственного.

## Задача

Измени `providers` на `viewProviders` в `card.component.ts`.

После исправления:
- Карточка управляет своей темой независимо ✓
- Projected content использует root `ThemeService` и **не реагирует** на кнопку карточки ✓

## Ограничения

- Нельзя изменять `theme.service.ts`, `themed-block.component.ts`, `app.component.ts`
- Только `card.component.ts`

## Запуск

```
npm run serve:angular-view-providers
```
