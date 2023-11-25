---
title: 🔴 Power of Effect
description: Challenge 7 is about creating an Ngrx effect with another Rxjs Hot observable
author: thomas-laforge
challengeNumber: 7
command: ngrx-notification
sidebar:
  order: 206
---

:::note
WIP: The following documentation will be reviewed and improved. However, you can still take on the challenge. If you don't understand a certain part, please feel free to reach out or create an issue.
:::

## Information

NgRx Effect is a very powerful library developed by the NgRx team. Effects subscribe to a HOT Observable and listen to any event dispatched from any place inside the application.

But what we often forget is that Effects can subscribe to ANY observable. Which means we can wrap a hot observable inside an effect and had logic in it.

In this exercice, we will find a way to create a very powerful, scalable and maintanable push messages listener. Currently, the code is located inside a single file with a if else condition to send the push data to the right location. This code is not very scalable since we need to add more and more else, and so not very maintainable since the piece of code will become bigger and bigger.

Also, we load the whole file at startup even if we haven't loaded some part of the application (lazy loading); and so we don't need to listen or update that part of the store. We need to decouple that logic.

### Step 1

create an injection token to hide the push service implementation.

### Step 2

create one ngrx effect, or component store effect for each push type, and implement your logic.

### Step 3

load your effect only when necessary.
the application contain a root route, a lazy loaded route and a component with a local state (implemented with Component store).
