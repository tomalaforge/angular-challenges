# RxJS — Реактивное программирование для фронтенд-разработчиков

> От идеи до практического использования

**Источники содержания:**
- Курс RxJS: [rxjs-course-avy.web.app/lessons](https://rxjs-course-avy.web.app/lessons)
- Официальная документация: [rxjs.dev](https://rxjs.dev/)
- Практический контекст: [angular-challenges.vercel.app](https://angular-challenges.vercel.app/)

---

# Раздел 1. Добро пожаловать в RX

Идея реактивности и разница подходов

---

## Почему callback и Promise недостаточны

UI — это множество событий во времени, а не один результат.

| Инструмент | Проблема |
|------------|----------|
| Callbacks | Вложенность, сложность отмены, невозможно комбинировать источники |
| Promise | Один результат, без отмены, нельзя передать несколько значений |
| addEventListener | Ручная очистка, нет трансформации, хаос при множестве источников |

> Запомни: Promise — одно значение. UI — много значений во времени.

---

## Что такое RxJS

Библиотека для работы с потоками значений во времени — единый подход к событиям, HTTP и данным.

- Поток значений — клики, ввод, HTTP, таймеры — всё это последовательности значений, распределённых во времени
- Операторы — трансформация, фильтрация и комбинирование потоков (как `map` и `filter` для массивов)
- Единый API — один способ работы со всеми асинхронными источниками в приложении

> Запомни: RxJS — это способ собрать обработку событий в понятный конвейер: событие → обработка → результат.

Источники: [RxJS Overview](https://rxjs.dev/guide/overview), [RxJS Course Lesson 1](https://rxjs-course-avy.web.app/lessons)

---

## Promise vs Observable

| | Promise | Observable |
|---|---------|------------|
| Количество значений | одно | много |
| Отмена | сам Promise не отменяется; для операции можно использовать `AbortController` | есть через `unsubscribe()` |
| Выполнение | уже созданный Promise начинает работу сразу | cold Observable обычно начинает работу при `subscribe()` |
| Композиция | ограничена | `pipe` + operators |

> Запомни: подписка запускает cold Observable, но не делает ленивым уже созданный Promise. Для отложенного создания Promise используй `defer(() => from(...))`.

---

## Где живёт Observable

Observable — единая обёртка для всех источников данных в Angular.

| Источник | Пример |
|----------|--------|
| HTTP | `HttpClient.get()` возвращает Observable |
| Events | `fromEvent(element, 'click')` — клики, ввод |
| Forms | `FormControl.valueChanges` — поток значений |
| Router | `ActivatedRoute.params` — поток параметров URL |
| WebSocket | Поток сообщений в реальном времени |
| Timer | `interval(1000)` — периодические значения |

> Запомни: Observable встречается в HttpClient, формах, роутере и событиях.

---

## Push и Pull

Pull — вы запрашиваете. Push — данные приходят сами.

```
PULL:  const answer = service.getData();     // вы вызываете → получаете результат
PUSH:  stream$.subscribe(v => log(v));       // источник сам отправляет значения
```

> Запомни: Observable — это Push-модель: данные приходят сами, вы только подписываетесь.

---

# Раздел 2. Базовые элементы

Observable, Observer, Subscription, pipe, operators

---

## Observable — описание потока

Cold Observable обычно является рецептом: он создаёт работу для каждого подписчика и ничего не делает до `subscribe()`. Но это не свойство любого источника — `from(promise)` получает уже запущенный Promise, а `Subject` может быть горячим источником.

```
1. Создание:  const stream$ = of(1, 2, 3);         — ничего не произошло
2. Подписка:  stream$.subscribe(v => log(v));       — значения пошли
```

```typescript
import { of } from 'rxjs';

const stream$ = of(1, 2, 3);
// Ничего не происходит

stream$.subscribe(v => console.log(v));
// 1, 2, 3
```

> Запомни: Без `subscribe()` Observable — просто описание, не действие.

---

## Жизненный цикл: next, error, complete

У каждого Observable три типа уведомлений:

| Метод | Описание |
|-------|----------|
| `next(value)` | Новое значение в потоке. Может вызываться 0+ раз. |
| `error(err)` | Ошибка. Поток завершается. Дальше — ничего. |
| `complete()` | Поток завершён успешно. Дальше — ничего. |

```typescript
stream$.subscribe({
  next:     v => console.log(v),
  error:    e => console.error(e),
  complete: () => console.log('done')
});
```

> Запомни: Контракт: `next* → (error | complete)?` — после error или complete новых значений не будет.

---

## Subject и BehaviorSubject

`Subject` одновременно является Observable и Observer: компонент может отправить в него событие через `next()`, а подписчики получат это событие.

```typescript
import { BehaviorSubject, Subject } from 'rxjs';

const submit$ = new Subject<void>();
submit$.subscribe(() => console.log('submitted'));
submit$.next();
```

`BehaviorSubject` дополнительно хранит последнее значение и сразу отдаёт его новому подписчику:

```typescript
const page$ = new BehaviorSubject(1);
page$.subscribe(page => console.log(page)); // 1
page$.next(2);
```

`Subject` и `BehaviorSubject` — горячие источники: значение получает только активный подписчик. Для состояния в новых Angular-компонентах часто удобнее использовать `signal`, но Subject полезен как мост событий и для `takeUntil`.

---

## Subscription и очистка

Подписка — это ресурс. Особенно опасна подписка на долгоживущий Observable (`interval`, `fromEvent`, WebSocket, `valueChanges`), если её жизненный цикл не связан с компонентом.

```
subscribe()         → Начинается приём значений
unsubscribe()       → Приём останавливается, ресурсы освобождаются
нет очистки         → Возможны утечки памяти и вызовы после уничтожения компонента
```

```typescript
const sub = interval(1000).subscribe(v => log(v));
// ...позже...
sub.unsubscribe(); // остановить поток
```

Angular: Используйте `takeUntil(destroy$)` или AsyncPipe — он отписывается сам.

> Запомни: `interval(1000)` без отписки будет работать вечно — даже после уничтожения компонента.

---

## Что теперь умеем

- Объяснить разницу между Promise и Observable
- Создать Observable, подписаться и отписаться
- Понять контракт `next → error | complete`
- Знать, почему незакрытая подписка — это утечка

---

# Раздел 3. Операторы создания

of, from, interval, defer, throwError

---

## of()

Создаёт Observable из готовых значений. Каждое значение — `next`, затем `complete`.

```
input:   --(1)--(2)--(3)--|
         ↓
         of(1, 2, 3)
         ↓
output:  --(1)--(2)--(3)--|
```

```typescript
import { of } from 'rxjs';

of(10, 20, 30).subscribe({
  next: v => console.log(v),
  complete: () => console.log('done')
});
// 10, 20, 30, done
```

> Запомни: `of` — самый простой способ создать Observable из значений.

---

## from()

Превращает массив, Promise или iterable в Observable — по одному значению за раз.

```
input:   --('a')--('b')--('c')--|
         ↓
         from(['a','b','c'])
         ↓
output:  --('a')--('b')--('c')--|
```

```typescript
import { from } from 'rxjs';

from(['a', 'b', 'c']).subscribe(v => log(v));
// 'a', 'b', 'c' — по одному

from(fetch('/api/data')).subscribe(res => log(res));
// Promise → Observable
```

> Запомни: `from` разворачивает массив в поток значений. `of` — передаёт массив целиком.

---

## of([1,2,3]) vs from([1,2,3])

| | of([1, 2, 3]) | from([1, 2, 3]) |
|---|---|---|
| Поток | `--([1,2,3])--|` | `--(1)--(2)--(3)--|` |
| Поведение | `next([1,2,3])` → `complete()` | `next(1)` → `next(2)` → `next(3)` → `complete()` |

```typescript
of([1, 2, 3]).subscribe(v => console.log(v));
// [1, 2, 3]  ← одно значение-массив

from([1, 2, 3]).subscribe(v => console.log(v));
// 1, 2, 3  ← три значения
```

> Запомни: `of` хранит структуру. `from` разворачивает.

---

## from(promise)

Promise превращается в Observable: один `next`, затем `complete`. Ошибка Promise → `error`.

```
Promise:     ----(resolved)----|
             ↓ from()
Observable:  ----(resolved)----|
```

```typescript
import { from } from 'rxjs';

from(fetch('/api/users')).subscribe({
  next: res => log(res),
  error: err => log(err)
});
```

Angular: Когда нужен Observable из стороннего Promise (например, Web API).

> Запомни: Promise resolve → `next + complete`. Promise reject → `error`.

---

## defer()

Создаёт Observable заново при каждой подписке. Фабрика, которая вызывается на каждый `subscribe`.

```
subscribe #1 → factory() вызывается → новый Observable
subscribe #2 → factory() вызывается снова → новый Observable
```

```typescript
import { defer, of } from 'rxjs';

let requestNumber = 0;
const request$ = defer(() => of(++requestNumber));

request$.subscribe(v => log(v)); // 1
request$.subscribe(v => log(v)); // 2 — фабрика вызвана снова
```

Angular: HTTP-запрос, который нужно повторять с актуальными параметрами при каждой подписке.

> Запомни: `of(1)` — одно значение для всех. `defer` — новый Observable на каждый subscribe.

---

## throwError()

Создаёт Observable, который сразу отправляет `error`. Полезен в `catchError` для повторного выброса.

```
--X (error)
```

```typescript
import { throwError } from 'rxjs';

throwError(() => new Error('Boom')).subscribe({
  error: e => console.log(e.message) // 'Boom'
});
```

> Запомни: `throwError` нужен в `catchError`: вернуть ошибку дальше, а не «проглотить» её.

---

## interval() + take()

`interval(period)` — бесконечный поток с задержкой. `take(N)` — берёт N значений и завершает.

```
input:   --(0)--(1)--(2)--(3)--(4)--...
         ↓
         take(3)
         ↓
output:  --(0)--(1)--(2)--|
```

```typescript
import { interval, take } from 'rxjs';

interval(1000)           // 0, 1, 2, 3, ... бесконечно
  .pipe(take(3))         // взять только 3
  .subscribe(v => log(v));
// 0, 1, 2, complete
```

> Запомни: `take(N)` — простой способ завершить бесконечный поток.

---

## Что теперь умеем

- Создать Observable из значений, массива, Promise
- Понять разницу `of` и `from`
- Использовать `defer` для ленивого создания на каждую подписку
- Прервать бесконечный поток через `take()`

---

# Раздел 4. pipe и операторы

Трансформация, фильтрация и побочные эффекты

---

## pipe()

`pipe` — это конвейер. Значения проходят через операторы слева направо.

```
source$ → [op1] → [op2] → [op3] → output
```

```typescript
source$.pipe(
  op1,
  op2,
  op3
).subscribe(result);
```

> Запомни: Операторы в `pipe` выполняются последовательно: вывод `op1` → вход `op2`.

---

## map()

Преобразует каждое значение. Как `Array.map`, но для потока.

```
input:   --(1)--(2)--(3)--|
         ↓
         map(x => x * 10)
         ↓
output:  --(10)--(20)--(30)--|
```

```typescript
import { of, map } from 'rxjs';

of(1, 2, 3).pipe(
  map(x => x * 10)
).subscribe(v => log(v));
// 10, 20, 30
```

Angular: Из ответа API → модель для шаблона (ViewModel).

> Запомни: `map` — чистая трансформация: вход → выход, без побочных эффектов.

---

## filter()

Пропускает только значения, удовлетворяющие условию.

```
input:   --(1)--(2)--(3)--(4)--(5)--|
         ↓
         filter(x => x > 2)
         ↓
output:  ------(3)--(4)--(5)------|
```

```typescript
import { of, filter } from 'rxjs';

of(1, 2, 3, 4, 5).pipe(
  filter(x => x > 2)
).subscribe(v => log(v));
// 3, 4, 5
```

Angular: Фильтрация элементов списка по условию из `valueChanges`.

> Запомни: `filter` пропускает или отбрасывает. Он не меняет значение.

---

## map + filter в pipe

Операторы комбинируются в цепочку: вывод одного — вход следующего.

```
input:     --(1)--(2)--(3)--(4)--(5)--|
           ↓ filter(x => x > 2)
filtered:  ------(3)--(4)--(5)--------|
           ↓ map(x => x * 10)
output:    ------(30)--(40)--(50)----|
```

```typescript
of(1, 2, 3, 4, 5).pipe(
  filter(x => x > 2),
  map(x => x * 10)
).subscribe(v => log(v));
// 30, 40, 50
```

> Запомни: Порядок в `pipe` важен: `filter → map` и `map → filter` дают разные результаты.

---

## tap()

Выполняет побочное действие, не меняя поток. Для логов, отладки, загрузки.

```
input:   --(1)--(2)--(3)--|
         ↓ tap(v => log(v))
output:  --(1)--(2)--(3)--|   (значения не изменились, но лог сработал)
```

```typescript
of(1, 2, 3).pipe(
  tap(v => console.log('got:', v)),
  map(v => v * 10)
).subscribe();
```

Angular: Логирование значений потока для отладки без изменения результата.

> Запомни: `tap` не трансформирует. Если нужно изменить — используйте `map`.

---

## startWith()

Добавляет начальное значение перед потоком. Идеально для состояния загрузки.

```
input:   --------('Loaded')----|
         ↓
         startWith('Loading')
         ↓
output:  ('Loading')--('Loaded')----|
```

```typescript
import { of, startWith } from 'rxjs';

of('Loaded').pipe(
  startWith('Loading')
).subscribe(state => log(state));
// 'Loading', 'Loaded'
```

Angular: Показать 'Loading...' до получения данных от HttpClient.

> Запомни: `startWith` — первое, что увидит подписчик. Отлично для UI-состояний.

---

## distinctUntilChanged()

Пропускает значение только если оно отличается от предыдущего.

```
input:   --(a)--(a)--(b)--(b)--(a)--|
         ↓
         distinctUntilChanged()
         ↓
output:  --(a)------(b)------(a)--|
```

```typescript
import { from, distinctUntilChanged } from 'rxjs';

from(['a', 'a', 'b', 'b', 'a']).pipe(
  distinctUntilChanged()
).subscribe(v => log(v));
// 'a', 'b', 'a' — без дублей подряд
```

Angular: Фильтр `form.valueChanges`: не запускать логику, если значение не изменилось.

По умолчанию значения сравниваются через `===`. Для объектов сравнивайте нужное поле:

```typescript
results$.pipe(
  distinctUntilChanged((previous, current) => previous.id === current.id)
);
```

> Запомни: `distinctUntilChanged` сравнивает с предыдущим значением. Для объектов нужен явный компаратор или `distinctUntilKeyChanged`.

---

## debounceTime()

Ждёт паузу в потоке. Пропускает значение только если N мс ничего не пришло.

```
input:   (r)-(rx)-(rxjs)--------------------|
         ↓
         debounceTime(300)
         ↓
output:  ----------------(rxjs)------------|
```

```typescript
import { fromEvent, debounceTime, distinctUntilChanged, map } from 'rxjs';

fromEvent<InputEvent>(input, 'input').pipe(
  map(event => (event.target as HTMLInputElement).value),
  debounceTime(300),
  distinctUntilChanged(),
).subscribe(term => search(term));
// запрос только после паузы 300мс
// В компоненте Angular добавьте takeUntilDestroyed() или используйте valueChanges.
```

Angular: Живой поиск: не отправлять запрос на каждый символ, ждать окончания ввода.

> Запомни: `debounceTime` = «подожди, пока пользователь перестанет печатать».

---

## Что теперь умеем

- Комбинировать операторы через `pipe()`
- Трансформировать значения через `map`
- Фильтровать поток через `filter`
- Добавлять побочные эффекты через `tap`
- Создавать UI-состояния через `startWith`
- Убирать дубли через `distinctUntilChanged`
- Ждать паузу ввода через `debounceTime`

---

# Раздел 5. Higher-order mapping

switchMap, mergeMap, concatMap, exhaustMap

---

## Событие запускает запрос

Каждое событие в потоке может запускать новый Observable — например, HTTP-запрос.

```
события:   (ввод)
           ↓ switchMap / mergeMap / ...
запрос:    HTTP
```

Одно событие — один запрос. Пока всё просто.

> Запомни: Значение потока может быть другим Observable — например, HTTP-запросом.

---

## Что делать, если событий несколько?

Пока один запрос идёт, приходит новое событие. Что делать со старым запросом?

```
события:   (a)----(b)----(c)----------|
           ↓ каждое запускает запрос
запросы:   HTTP a  HTTP b  HTTP c
```

Четыре оператора дают четыре ответа на этот вопрос — четыре стратегии.

> Запомни: switchMap — отменить старый. mergeMap — запустить параллельно. concatMap — в очередь. exhaustMap — игнорировать.

---

## switchMap — отменяет предыдущий

Новое событие → предыдущий внутренний поток отменён.

```
events:   --(a)----(b)----(c)----------|
inner a:  --(a1)--(a2) ✕               |   ← отменён при 'b'
inner b:           --(b1)--(b2) ✕       |   ← отменён при 'c'
inner c:                    --(c1)--(c2)|
output:                     --(c1)--(c2)|
                              (✕ = отмена, | = complete)
```

| | |
|---|---|
| Поведение | Новое значение → отписывается от предыдущего → подписывается на новый |
| Идеально для | Живой поиск, отмена устаревших HTTP-запросов |
| Опасно для | Сохранение формы — запрос отменится до завершения |

```typescript
searchControl.valueChanges.pipe(
  debounceTime(300),
  switchMap(term => http.get('/api/search?q=' + term))
).subscribe(results => show(results));
```

Angular: Поле поиска: новый ввод отменяет предыдущий запрос — пользователь видит только актуальные результаты.

> Запомни: `switchMap` = «забудь прошлое, делай новое».

---

## mergeMap — выполняет параллельно

Все внутренние потоки выполняются одновременно, результаты приходят по мере готовности.

```
events:   --(a)----(b)----(c)----------|
inner a:  --(a1)--(a2)--(a3)|          |
inner b:           --(b1)--(b2)|        |
inner c:                    --(c1)--(c2)|
output:    --(a1)--(b1)--(a3)--(b2)--(c1)--(c2)|
```

| | |
|---|---|
| Поведение | Каждое событие запускает новый внутренний поток. Все живут одновременно. |
| Идеально для | Логирование, фоновые задачи, независимые запросы |
| Опасно для | Поиск — гонка ответов: ответы могут прийти вразнобой |

```typescript
from([1, 2, 3]).pipe(
  mergeMap(id => http.get(`/api/item/${id}`))
).subscribe(item => log(item));
```

Angular: Загрузка нескольких независимых ресурсов параллельно.

> Запомни: `mergeMap` = «запусти всё, результат — когда готов».

---

## concatMap — ставит в очередь

Внутренние Observable выполняются строго по очереди: следующий ждёт завершения предыдущего.

```
events:   --(a)-(b)-(c)----------------|
inner a:  --(a1)-----(a2)|              |
inner b:                --(b1)--(b2)|    |
inner c:                          --(c1)--(c2)|
output:   --(a2)--------(b2)--------(c2)|
```

| | |
|---|---|
| Поведение | Новое событие становится в очередь. Выполняется, когда предыдущее завершено. |
| Идеально для | Последовательные действия: сохранить → загрузить → обновить |
| Опасно для | Поиск — каждый запрос ждёт предыдущего, пользователь ждёт |

```typescript
saveActions$.pipe(
  concatMap(action => http.post('/api/save', action))
).subscribe(res => log(res));
```

Angular: Последовательное сохранение: сначала форма, потом связанные данные, потом лог.

> Запомни: `concatMap` = «по очереди, не торопясь».

---

## exhaustMap — игнорирует новые события

Пока внутренний Observable выполняется, новые события просто отбрасываются.

```
events:   --(a)--(b)--------(c)--------|     (b игнорируется — занят)
inner a:  --(a1)-----(a2)|              |
inner b:  (игнорирован)                 |
inner c:                       --(c1)--(c2)|
output:   --(a1)-----(a2)-----(c1)--(c2)|
```

| | |
|---|---|
| Поведение | Новое событие во время выполнения → игнорируется. После complete — следующее принимается. |
| Идеально для | Отправка формы — защита от повторной отправки |
| Опасно для | Поиск — быстрые нажатия теряются без ответа |

```typescript
submitClicks$.pipe(
  exhaustMap(() => http.post('/api/save', formData))
).subscribe(res => log(res));
```

Angular: Кнопка отправки формы: пока запрос идёт, повторные клики игнорируются.

> Запомни: `exhaustMap` = «занят — не мешай».

---

## Сравнение higher-order операторов

| Оператор | Стратегия | Когда |
|----------|-----------|-------|
| switchMap | Отменяет предыдущий | Поиск, отмена устаревших |
| mergeMap | Параллельно все | Независимые задачи |
| concatMap | По очереди | Последовательные шаги |
| exhaustMap | Игнорирует новые | Защита от дублей |

> Запомни: `switchMap` отменяет. `mergeMap` параллелит. `concatMap` ждёт. `exhaustMap` игнорирует.

---

## Что теперь умеем

- Понять, что такое higher-order Observable
- Выбрать `switchMap` для отмены устаревших запросов
- Выбрать `mergeMap` для параллельных независимых задач
- Выбрать `concatMap` для последовательных шагов
- Выбрать `exhaustMap` для защиты от двойных действий

---

# Раздел 6. Комбинирование и утилитарные операторы

combineLatest, forkJoin, takeUntil, shareReplay

---

## combineLatest()

Объединяет последние значения из нескольких потоков. Эмитит, когда каждый источник хотя бы раз отправил значение.

```
a$:       --(1)--------(2)-----------|
b$:       -----(x)---------(y)-------|
          ↓ combineLatest
result:   -----([1,x])--([2,x])--([2,y])--|
```

```typescript
import { combineLatest } from 'rxjs';

combineLatest([
  this.filterForm.valueChanges,
  this.route.queryParams
]).subscribe(([filters, params]) =>
  this.loadData(filters, params)
);
```

Angular: Синхронизация фильтров формы и URL-параметров: при изменении любого — перезагрузка данных.

> Запомни: `combineLatest` эмитит при любом изменении источника, если все уже отправили хотя бы раз.

---

## forkJoin()

Ждёт завершения всех источников, затем эмитит последние значения. Как `Promise.all` для Observable.

```
httpA$:    -----(a)----|
httpB$:    ----------(b)----|
          ↓ forkJoin
result:   --------------([a,b])----|
```

```typescript
import { forkJoin } from 'rxjs';

forkJoin({
  users: this.http.get('/api/users'),
  roles: this.http.get('/api/roles')
}).subscribe(({ users, roles }) =>
  this.init(users, roles)
);
```

Angular: Загрузка страницы: параллельные HTTP-запросы, рендер только когда все готовы.

> Запомни: `forkJoin` ждёт complete всех источников. Если источник бесконечный — результата не будет.

---

## takeUntil()

Завершает поток, когда управляющий Observable отправляет значение. Классический способ очистки подписок.

```
input:    --(1)--(2)--(3)--(4)--(5)--|
          ↓
          takeUntil(destroy$)
          ↓
output:   --(1)--(2)--(3)--|   (завершается при сигнале destroy$)
```

```typescript
import { Subject, takeUntil } from 'rxjs';

private destroy$ = new Subject<void>();

ngOnInit() {
  this.api.getData().pipe(
    takeUntil(this.destroy$)
  ).subscribe(data => this.data = data);
}

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}
```

Angular: Классический паттерн Angular: `takeUntil(destroy$)` + `ngOnDestroy` для безопасной отписки.

> Запомни: `takeUntil(notifier$)` завершает поток при первом значении `notifier$`. В Angular 16+ используйте `takeUntilDestroyed()`.

---

## shareReplay()

Разделяет одну подписку на источник и переотправляет последние N значений новым подписчикам. Для cold Observable это позволяет не создавать отдельную работу для каждого подписчика.

| | Поведение |
|---|---|
| Без shareReplay | Каждый subscribe → новый HTTP-запрос. N подписчиков = N запросов. |
| С `shareReplay({ bufferSize: 1, ... })` | Один результат сохраняется и отдаётся новым подписчикам. |
| `refCount: true` | Источник отключается, когда подписчиков не осталось. Для завершившегося HTTP результат обычно остаётся в replay-кэше. |
| `refCount: false` | Источник продолжает работать без подписчиков. Для бесконечных потоков это может удерживать ресурсы. |

`shareReplay` — не универсальный «вечный кэш». Для live-источников заранее решите, когда кэш должен сбрасываться и кто владеет подпиской.

```typescript
import { shareReplay } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private config$ = this.http.get('/api/config').pipe(
    shareReplay({ bufferSize: 1, refCount: true })
  );

  getConfig() { return this.config$; }
}
```

Angular: Конфигурация приложения: один HTTP-запрос, результат доступен всем компонентам.

> Запомни: `shareReplay(1)` — кэш последнего значения. `refCount: true` — отписка от источника, когда нет подписчиков.

---

## Что теперь умеем

- Объединить потоки через `combineLatest` и `forkJoin`
- Завершить поток по сигналу через `takeUntil`
- Кэшировать результат через `shareReplay`
- Выбрать правильный оператор комбинирования

---

# Раздел 7. RxJS в Angular

HttpClient, Router, Forms, AsyncPipe, lifecycle

---

## HttpClient

Возвращает Observable для каждого HTTP-запроса — один `next`, затем `complete` или `error`.

```typescript
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(id: number) {
    return this.http.get<User>(`/api/users/${id}`);
  }
}
```

Angular: `this.userService.getUser(1).subscribe(user => ...)` — один ответ, затем complete.

> Запомни: `HttpClient.get()` — это Observable. Если нужен повтор — переподпишитесь.

---

## Router

`ActivatedRoute.params` — поток параметров URL. Каждая навигация — новое значение.

```typescript
import { ActivatedRoute } from '@angular/router';

@Component({...})
export class UserDetailComponent {
  constructor(route: ActivatedRoute) {
    route.paramMap.pipe(
      switchMap(params => this.api.get(params.get('id')))
    ).subscribe(user => this.user = user);
  }
}
```

Angular: При смене URL `/users/1 → /users/2` — `switchMap` отменяет старый запрос, начинает новый.

> Запомни: Router — источник событий. `params`, `queryParams`, `data` — всё Observable.

---

## Reactive Forms

`valueChanges` и `statusChanges` — потоки значений и статусов формы.

```typescript
export class SearchComponent {
  search = new FormControl('');

  results$ = this.search.valueChanges.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(term => this.api.search(term))
  );
}
```

Angular: Поле поиска: debounce → фильтр дублей → отмена старого запроса → новые результаты.

> Запомни: `valueChanges` — это Observable. `pipe()` превращает его в готовый поток данных.

---

## AsyncPipe и Templates

AsyncPipe подписывается и отписывается автоматически. Не нужно ручное управление.

```
component:  users$ = this.api.getUsers();
            ↓
template:   *ngIf="users$ | async as users"
            ↓
результат:  подписка при рендере, отписка при уничтожении
```

```typescript
@Component({
  template: `
    <div *ngIf="users$ | async as users">
      @for (u of users; track u.id) {
        <app-user-card [user]="u" />
      }
    </div>
  `
})
export class UserListComponent {
  users$ = this.api.getUsers();
}
```

Angular: AsyncPipe идеален для потоков данных в шаблоне: нет утечек, нет ручного unsubscribe.

> Запомни: AsyncPipe = subscribe при создании + unsubscribe при уничтожении. Автоматически.

---

## Очистка подписок в современном Angular

| Подход | Описание |
|-------|----------|
| Классический | `takeUntil(destroy$)` + OnDestroy |
| Современный (Angular 16+) | `takeUntilDestroyed()` — без служебного кода |
| Декларативный | AsyncPipe — подписка и отписка автоматически |

```typescript
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({...})
export class MyComponent {
  data$ = this.api.getData().pipe(
    takeUntilDestroyed()
  ); // отписка при уничтожении компонента
}
```

Angular: `takeUntilDestroyed()` — короткий путь к безопасной подписке в Angular 16+.

Вызов без аргумента требует injection context: например, инициализации поля или конструктора. В `ngOnInit` и других обычных методах передайте `DestroyRef` явно:

```typescript
import { DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

private readonly destroyRef = inject(DestroyRef);

ngOnInit() {
  this.api.getData().pipe(
    takeUntilDestroyed(this.destroyRef),
  ).subscribe();
}
```

> Запомни: Если можно AsyncPipe — используйте AsyncPipe. Если нельзя — `takeUntilDestroyed()` с подходящим injection context.

---

## Что теперь умеем

- Понять, что HttpClient возвращает Observable
- Работать с Router params через switchMap
- Использовать valueChanges для реактивных форм
- Применять AsyncPipe для автоматической подписки
- Безопасно очищать подписки через takeUntilDestroyed()

---

# Раздел 8. Паттерны решения задач

Ситуация → потоки → оператор → схема → код → типичная ошибка

---

## CHALLENGE: Живой поиск без лишних запросов

Ситуация: Пользователь вводит текст в поле поиска. На каждый символ летит запрос — лишняя нагрузка.

Потоки: `valueChanges` формы → поток строк (ввод пользователя)

Оператор: `debounceTime` + `distinctUntilChanged` + `switchMap`

```
input:    (r)-(rx)-(rxjs)-----------(rxj)----|
          ↓ debounceTime(300) + distinctUntilChanged()
filtered: --------(rxjs)-----------(rxj)----|
          ↓ switchMap(term → HTTP)
output:   -----------(results)-----(results)|
```

```typescript
this.search.valueChanges.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap(term => this.http.get('/api/search?q=' + term))
).subscribe(results => this.results = results);
```

Типичная ошибка: Отправлять запрос на каждый символ — сервер заваливается запросами, интерфейс лагает.

---

## CHALLENGE: Отмена устаревшего HTTP-запроса

Ситуация: Быстрая навигация между страницами: старый запрос ещё не вернулся, а нужен уже новый.

Потоки: Router params → поток ID → HTTP-запрос для каждого ID

Оператор: `switchMap`

```
params:   --(id:1)----(id:2)----(id:3)----|
          ↓ switchMap(id → HTTP)
inner:    --(data1) ✕                |     ← отменён
                    --(data2) ✕      |     ← отменён
                              --(data3)|
output:                       --(data3)|
```

```typescript
route.paramMap.pipe(
  switchMap(params => this.api.get(params.get('id')))
).subscribe(user => this.user = user);
```

Типичная ошибка: Использовать `mergeMap` — результаты приходят вразнобой, пользователь видит данные от старого запроса.

---

## CHALLENGE: Сохранение формы без повторной отправки

Ситуация: Пользователь кликает «Сохранить» несколько раз. Каждый клик отправляет запрос.

Потоки: button click → поток событий → HTTP POST для каждого

Оператор: `exhaustMap`

```
clicks:   --(click)--(click)--------(click)----|
          ↓ exhaustMap(() → POST)
requests: --(POST)----|           (POST)----|
              (второй click проигнорирован — занят)
```

```typescript
fromEvent(submitBtn, 'click').pipe(
  exhaustMap(() => this.http.post('/api/save', this.form.value))
).subscribe(res => this.onSaved(res));
```

Типичная ошибка: Использовать `mergeMap` — каждый клик отправляет новый POST, данные сохраняются дважды.

---

## Загрузка данных из нескольких источников

`combineLatest` — объединяет последние значения из нескольких потоков. `forkJoin` — ждёт завершения всех.

```
users$:   ----(users)--------------------------|
roles$:   --------(roles)----------------------|
          ↓ combineLatest
combined: --------([users, roles])--------------|
```

```typescript
import { combineLatest } from 'rxjs';
import { forkJoin } from 'rxjs';

// Когда оба потока активны и обновляются:
combineLatest([users$, roles$])
  .subscribe(([users, roles]) => render(users, roles));

// Когда нужно дождаться завершения всех:
forkJoin([http.get('/a'), http.get('/b')])
  .subscribe(([a, b]) => init(a, b));
```

Angular: Загрузка страницы: параллельные HTTP-запросы, рендер только когда все готовы.

> Запомни: `combineLatest` — для живых потоков. `forkJoin` — для завершающихся (HTTP).

Особые случаи:

- `combineLatest` не эмитит, пока каждый источник не отправит хотя бы одно значение;
- если источник бесконечный, комбинация обычно не завершится сама — используйте `takeUntil` или `take`;
- `forkJoin` ждёт `complete` всех источников и не подходит для `interval` или WebSocket;
- ошибка одного источника завершает весь `forkJoin`, а источник без единого значения может привести к завершению без результата.

---

## Обработка ошибок без поломки UI

`catchError` перехватывает ошибку и должен вернуть новый Observable. Он заменяет текущий поток, а не «оживляет» уже завершившийся источник. Положение оператора особенно важно внутри higher-order оператора.

```
http$:  --------(data)----X
        ↓ catchError(err → of([]))
safe$:  ---------([])-----|
```

```typescript
import { catchError, finalize, of, retry, startWith, throwError } from 'rxjs';

this.http.get<User[]>('/api/users').pipe(
  catchError(() => of([])),        // fallback — пустой массив
  startWith([]),                   // начальное состояние
).subscribe(users => this.users = users);
```

Если ошибку нужно передать дальше после логирования, верните `throwError`:

```typescript
this.http.get<User[]>('/api/users').pipe(
  catchError(error => {
    console.error('Cannot load users', error);
    return throwError(() => error);
  }),
);
```

`retry` повторяет подписку на источник, а `finalize` выполняется при успехе, ошибке или отмене:

```typescript
this.http.get<Data>('/api/data').pipe(
  retry({ count: 2, delay: 1000 }),
  finalize(() => this.loading = false),
);
```

Angular: HTTP-запрос упал — показать fallback или передать ошибку в слой UI. Для долгоживущего внешнего потока помещайте `catchError` внутрь `switchMap`/`concatMap`, если после ошибки нужно принимать следующие события.

> Запомни: `catchError` должен вернуть Observable. `of([])` заменяет ошибку значением, `throwError` пробрасывает её дальше.

---

## CHALLENGE: Синхронизация фильтров, URL и API

Ситуация: Фильтры формы, параметры URL и API-запрос должны быть синхронизированы. Изменение любого — перезагрузка данных.

Потоки: `valueChanges` формы + `route.queryParams` → два потока

Оператор: `combineLatest` + `switchMap`

```
filters$:  --(f1)--------(f2)-----------|
params$:   ------(p1)------------------|
           ↓ combineLatest + switchMap(([f, p]) → API)
output:    ------(data1)--(data2)------|
```

```typescript
combineLatest([
  this.filterForm.valueChanges.pipe(startWith(this.filterForm.value)),
  this.route.queryParams
]).pipe(
  switchMap(([filters, params]) =>
    this.http.get('/api/data', { params: { ...filters, ...params } })
  )
).subscribe(data => this.data = data);
```

Типичная ошибка: Подписываться на каждый источник отдельно — гонка ответов, данные рассинхронизируются.

---

## CHALLENGE: Состояния loading / data / error

Ситуация: HTTP-запрос должен показывать loading, данные или ошибку. При ошибке — возможность повтора.

Потоки: HTTP-запрос → состояния loading, data, error

Оператор: `startWith` + `catchError` + `retry`

```
http$:     -----(data)----|
           ↓ startWith('loading') + catchError + retry(2)
view$:     (loading)--(data)----|

error:     -----(X error)----|
           ↓ catchError → of({ error })
view$:     (loading)--({ error })----|
```

```typescript
this.http.get<Data>('/api/data').pipe(
  retry({ count: 2, delay: 1000 }),
  catchError(err => of({ error: err })),
  startWith({ loading: true }),
  finalize(() => this.loading = false)
).subscribe(state => this.state = state);
```

Типичная ошибка: Не обрабатывать error — поток умирает, интерфейс застревает в загрузке. `catchError` без запасного значения — тоже умирает.

---

## CHALLENGE: Предотвращение утечек подписок

Ситуация: Компонент уничтожен, но подписка живёт. Коллбэки вызываются на уничтоженном компоненте.

Потоки: Любой long-lived Observable: `interval`, `valueChanges`, `Subject`

Оператор: `takeUntilDestroyed()` или AsyncPipe

```
БЕЗ ОЧИСТКИ:   subscribe → component destroyed → callback всё ещё вызывается! [ошибка]
С ОЧИСТКОЙ:   subscribe → component destroyed → unsubscribe автоматически [ok]
```

```typescript
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

// В поле компонента:
data$ = this.api.getData().pipe(
  takeUntilDestroyed()
);

// Или в конструкторе:
this.api.getLive().pipe(
  takeUntilDestroyed()
).subscribe(v => this.v = v);
```

Типичная ошибка: Сохранять `Subscription` в свойстве и отписываться в `ngOnDestroy` — работает, но много служебного кода. Легко забыть.

---

## Тестирование RxJS-потоков

Для тестов используйте детерминированные Observable, а не реальные задержки и случайные ответы сервера. Проверяйте не только финальное значение, но и количество подписок, отмену и продолжение внешнего потока после ошибки.

```typescript
import { map } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

const scheduler = new TestScheduler((actual, expected) => {
  expect(actual).toEqual(expected);
});

scheduler.run(({ cold, expectObservable }) => {
  const source$ = cold<string>('-a-b|');

  expectObservable(source$.pipe(map(value => value.toUpperCase())))
    .toBe('-x-y|', { x: 'A', y: 'B' });
});
```

Для Angular-компонентов дополнительно используйте mock-сервисы и `fakeAsync`/`tick`, а не реальные HTTP-запросы.

---

# Раздел 9. Итоги

Памятка и алгоритм выбора оператора

---

## Памятка: ситуация → оператор

| Ситуация | Оператор | Почему |
|----------|----------|--------|
| Ждать паузы ввода | `debounceTime` | Не слать запрос на каждый символ |
| Убрать дубли подряд | `distinctUntilChanged` | Не повторять одно и то же |
| Отменить устаревший запрос | `switchMap` | Новый запрос → старый не нужен |
| Защита от повторной отправки | `exhaustMap` | Пока занят — игнорируй клики |
| Последовательные шаги | `concatMap` | Очередь: шаг за шагом |
| Параллельные запросы | `mergeMap` | Все сразу, результаты по готовности |
| Ждать все запросы | `forkJoin` | Как `Promise.all` для Observable |
| Объединить живые потоки | `combineLatest` | Последние значения из каждого |
| Начальное состояние | `startWith` | Показать 'Loading' до данных |
| Перехват ошибки | `catchError` | Вернуть запасное значение, не уронить UI |
| Очистка подписки | `takeUntilDestroyed` | Отписка при уничтожении |
| Побочный эффект | `tap` | Лог, отладка — без изменения потока |

> Запомни: Сохраните эту памятку — она поможет быстро выбрать нужный оператор.

---

## Алгоритм выбора higher-order оператора

Четыре вопроса — и вы знаете, какой оператор нужен:

### 1. Нужно отменять прошлую работу при новом событии?
→ **switchMap**
Живой поиск, навигация, отмена устаревших запросов

### 2. Нужна строгая очередь — шаг за шагом?
→ **concatMap**
Последовательные сохранения, цепочки запросов

### 3. Можно выполнять параллельно, порядок не важен?
→ **mergeMap**
Логирование, независимые задачи, фоновые процессы

### 4. Нужно игнорировать повторные действия, пока текущее не закончилось?
→ **exhaustMap**
Отправка формы, предотвращение повторной отправки

> Запомни: `switchMap` отменяет. `concatMap` ждёт. `mergeMap` параллелит. `exhaustMap` игнорирует.

---

# Раздел 10. RxJS в других UI-библиотеках

React, Vue и другие фреймворки

---

## RxJS в других UI-библиотеках: React

RxJS не привязан к Angular — те же операторы работают в любом фреймворке.

| Подход | Описание |
|-------|----------|
| `useObservable` | Хук-обёртка: подписывается на Observable и возвращает значение |
| `useEffect` + `subscribe` | Ручной способ: подписка в useEffect, отписка при размонтировании |
| Библиотеки | `rxjs-hooks`, `observable-hooks`, `react-rxjs` — готовые решения |

```typescript
const ref = useRef(null);

useEffect(() => {
  const sub = fromEvent(ref.current, 'input').pipe(
    debounceTime(300),
    switchMap(e => fetch('/api?q=' + e.target.value).then(r => r.json()))
  ).subscribe(console.log);
  return () => sub.unsubscribe();
}, []);
```

В React RxJS используется через хуки: подписка в `useEffect`, отписка при размонтировании компонента.

> Запомни: RxJS работает везде, где есть JavaScript. Angular, React, Vue — операторы одни и те же.

Источники: [rxjs-hooks](https://github.com/LeetCode-OpenSource/rxjs-hooks), [react-rxjs.org](https://react-rxjs.org/), [Robin Wieruch tutorial](https://www.robinwieruch.de/react-rxjs-state-management-tutorial/)

---

## Финал

RxJS — поток значений во времени: одна модель для всех источников.

- Observable — описание потока (cyan)
- Operators — трансформация потока (violet)
- Events — источники событий (green)
- Results — результаты (amber)
- Errors — ошибки (coral)

Источники:
- [rxjs.dev](https://rxjs.dev/) — официальная документация
- [rxjs-course-avy.web.app](https://rxjs-course-avy.web.app/lessons) — курс RxJS Ninja
- [angular-challenges.vercel.app](https://angular-challenges.vercel.app/) — практические задачи
- [rxjs-hooks](https://github.com/LeetCode-OpenSource/rxjs-hooks) — RxJS хуки для React
- [react-rxjs.org](https://react-rxjs.org/) — React-RxJS библиотека
