# Гонка при загрузке данных

В этом задании нужно исправить ситуацию, когда пользователь открывает диалоговое
окно раньше, чем завершился запрос за данными.

Связь с лекцией: разделы 6–7, операторы `shareReplay`, `take` и работа с HTTP в Angular.

## Запуск

Команды выполняй из корня репозитория:

```bash
npm install
npm run serve:rxjs-race-condition
```

Если зависимости уже установлены, достаточно выполнить вторую команду.

После запуска появится кнопка **Открыть тему**. Она должна открывать диалоговое
окно с тремя темами: `Politic`, `Culture`, `Nature`.

## Устройство заготовки

Открой файлы:

- `src/app/app.component.ts` — кнопка и открытие диалога;
- `src/app/topic.service.ts` — получение тем с задержкой;
- `src/app/topic-dialog.component.ts` — содержимое диалога;
- `src/app/app.component.cy.ts` — проверка правильного поведения.

Метод `fakeGetHttpTopic` возвращает темы через одну секунду:

```ts
fakeGetHttpTopic = () =>
  timer(1000).pipe(map((): TopicType[] => ['Politic', 'Culture', 'Nature']));
```

Сейчас компонент загружает темы в `ngOnInit`, а при нажатии сразу передаёт в диалог
текущее значение `this.topics`.

## Воспроизведение ошибки

1. Запусти приложение.
2. Сразу нажми **Открыть тему**, не дожидаясь загрузки.
3. Диалог откроется с пустым списком.

Запрос ещё не завершился, поэтому `this.topics` содержит пустой массив. Это и есть
гонка: открытие диалога происходит раньше получения данных.

## Проверка

Из корня репозитория выполни:

```bash
npx cypress run --component \
  --config-file lessons/rxjs/tasks/race-condition/cypress.config.ts \
  --spec lessons/rxjs/tasks/race-condition/src/app/app.component.cy.ts
```

До исправления тест должен завершиться ошибкой. После исправления он должен пройти.

Для интерактивного запуска:

```bash
npx cypress open --component \
  --config-file lessons/rxjs/tasks/race-condition/cypress.config.ts
```

## Задание

К моменту открытия диалога темы уже должны быть загружены. При этом:

- нельзя менять `fakeGetHttpTopic`;
- нельзя менять Cypress-тест;
- первый клик не должен открывать пустой диалог;
- повторное открытие не должно выполнять новый запрос после успешной загрузки.

Рекомендуемый вариант — создать общий поток и сохранить последнее полученное значение:

```ts
import { shareReplay, take } from 'rxjs';

readonly topics$ = this.topicService.fakeGetHttpTopic().pipe(
  shareReplay({ bufferSize: 1, refCount: true }),
);

openTopicModal() {
  this.topics$.pipe(take(1)).subscribe((topics) => {
    this.dialog.open(TopicModalComponent, { data: { topics } });
  });
}
```

Можно использовать другой эквивалентный подход, если он сохраняет те же условия.
