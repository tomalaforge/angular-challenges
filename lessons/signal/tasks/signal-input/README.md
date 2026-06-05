# Signal Input

### Как запускать

```bash
npm run serve:signal-signal-input
```

## Документация
---
title: 🟢 Signal Input
description: Испытание 43 про то как использовать signal inputs
author: thomas-laforge
contributors:
  - stillst
challengeNumber: 43
command: signal-signal-input
sidebar:
  order: 16
---

## Информация

Наконец настал тот день, когда разработчики Angular добавили долгожданный реактивный input.
Фича, которую ждали на протяжении многих лет, появилась в версии 17.1 под названием `SignalInput`.
Теперь, вместо привычного декоратора `@Input`, у нас есть функция, которая возвращает сигнал.

```ts
// старый способ
@Input() age?: number;

// новый способ
age = input<number>()
```

Если нужны обязательные inputs.

```ts
// старый способ
@Input({required: true}) age!: number;

// новый способ
age = input.required<number>()
```

Если было нужно получить сигнал из input приходилось использовать сеттер.

```ts
// старый способ
age = signal(0)
@Input({alias: 'age'}) set _age(age: number){
  this.age.set(age)
};

// новый способ
age = input<number>()
```

## Пояснение

Задача этого упражнения - переработать `UserComponent`, чтобы в нем был использован `SignalInput`.

- У вас есть обязательные и не обязательные inputs.
- Вы можете использовать функцию `transform` для ввода `age`, чтобы преобразовать свойство в число.
