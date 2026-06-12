# APP_INITIALIZER — Challenge

## Проблема

Приложение загружает конфигурацию из `/assets/config.json`, но делает это
**после** рендера. На экране сначала видны значения `NOT CONFIGURED`.

`ConfigService.load()` уже написан — его нужно только подключить.

## Задача

Настрой `APP_INITIALIZER` в `app.config.ts` так, чтобы `ConfigService.load()`
вызвался **до** первого рендера. После исправления приложение должно сразу
показывать значения из `config.json` без мигания.

## Ограничения

- Нельзя изменять `config.service.ts`
- Нельзя изменять `app.component.ts`
- Только `app.config.ts`

## Запуск

```
npm run serve:angular-app-initializer
```
