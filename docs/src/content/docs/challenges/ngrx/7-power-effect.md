---
title: 🔴 Power of Effect
description: Challenge 7 is about creating an Ngrx effect with another Rxjs Hot observable
author: thomas-laforge
contributors:
  - tomalaforge
  - tomer953
  - jdegand
challengeNumber: 7
command: ngrx-notification
sidebar:
  order: 206
---

## Information

This application exhibits local and global state confusion. Right now, a notification service is used to update the component lists of students and teachers. You need to add schools to this service, but you _cannot_. The school component uses its _own_ local state inside a `ComponentStore`. Thus, you are unable to dispatch an action in the notification service that the school component can respond to (remember, component stores do not have `actions`). So, how can we get around these issues?

Injection tokens and NgRx effects can greatly help.

`NgRx Effects` is a very powerful library developed by the NgRx team. Effects subscribe to a HOT Observable and listen for all events dispatched inside an application. `NgRx Effects` can subscribe to _any_ observable, which means we can wrap a hot observable inside an effect and add logic to it. You don't have to worry about the local or global state. Although you should be mindful of bad practices, when you refactor this application, you should make a determination of what should be a part of the local state and what should be a part of the global state.

In this exercise, we will need to find a way to create a very powerful, scalable, and maintainable push message listener.

### Step 1

Create an injection token to `inject` the push service inside each component. Injection tokens are very powerful. If you are unfamiliar with them, you may want to complete the [Injection token challenge](https://angular-challenges.vercel.app/challenges/angular/39-injection-token) first. This [article](https://netbasal.com/the-hidden-power-of-injectiontoken-factory-functions-in-angular-d42d5575859b) is also a great resource.

_Eliminate_ the notification service. It is not extensible. Testing (not required for this challenge) the notification service would also be overly complicated. You would need to test each branching scenario. Injection tokens can easily be mocked.

Since the notification service is global, all component lists update whether or not, a user is on that route. We need to decouple that logic. The notification messages should display only on their respective routes.

### Step 2

Create one ngrx effect, or component store effect for each push type, and implement your logic.

### Step 3

Show an [Angular Material snackbar](https://material.angular.io/components/snack-bar/overview) notification when an add event happens. Make each notification distinct.

### Step 4

Load your effect only when necessary.

The application contains a root route, a lazy loaded route, and a component with a local state (implemented with `ComponentStore`).
