# Structural Directive

### Как запускать

```bash
npm run serve:angular-structural-directive
```

## Информация

Структурные директивы - это директивы, которые изменяют структуру DOM путем добавления и удаления элементов DOM. Это важная концепция, которую вам нужно освоить для улучшения своих знаний в Angular. Это будет первой частью этого испытания. Для получения дополнительной информации ознакомьтесь с [официальной документацией](https://angular.dev/guide/directives/structural-directives).

Guards, такие как `CanActivate` или `CanMatch`, также очень важны, так как вам они понадобятся в большинстве приложений. Если вы не очень знакомы с route guards, ознакомьтесь с этими двумя статьями:

- [Everything you need to know about route Guard in Angular](https://itnext.io/everything-you-need-to-know-about-route-guard-in-angular-697a062d3198)
- [Create a route Guard to manage permissions](https://medium.com/@thomas.laforge/create-a-route-guard-to-manage-permissions-26f16cc9a1ca)

## Пояснение

В `LoginComponent` вы найдете кнопки, соответствующие разным ролям пользователей:

- Admin (Администратор)
- Manager (Менеджер)
- Reader (Читатель)
- Writer (Писатель)
- Reader and Writer (Читатель и писатель)
- Client (Клиент)
- Everyone (Все)

## Шаг 1

В `InformationComponent` вы должны отобразить правильную информацию для каждой роли, используя структурную директиву.

### Ограничение

- Не использовать `ngIf` или `@if` внутри `InformationComponent`.
- Импорт store внутри `InformationComponent` запрещен.

Результат должен выглядеть примерно так:

```html
<div *hasRole="Role1">Info for Role1</div>
```

```html
<div *hasRole="['Role1', 'Role2']">Info for Role1 and Role2</div>
```

```html
<div *hasRoleSuperAdmin="true">Info Only for superadmin</div>
```

## Шаг 2

В `Routes.ts` вы должны маршрутизировать всех пользователей на правильный `DashboardComponent` с использованием guard `CanMatch`.
