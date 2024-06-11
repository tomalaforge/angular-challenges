---
title: 🟢 Lazy Load a Component
description: Challenge 52 is about understanding how to lazy load a component in Angular.
author: lance-finney
contributors:
  - LMFinney
challengeNumber: 52
command: angular-lazy-load-component
sidebar:
  order: 21
---

## Information

Angular has long had route-based lazy loading for entire modules, but lazy loading individual components was much more complicated. This challenge is about understanding how to lazy load a component easily with a feature that was introduced in Angular 17.

## Statement

This is a simple application that can display a `TopComponent` that we are pretending would slow the application down if it were part of the initial bundle (it actually contains just a bit of text, but we are pretending).

The current implementation shows a `PlaceholderComponent` until the user clicks a button to display the `TopComponent`. However, even though the `TopComponent` isn't visible until the button is clicked, it is still loaded as part of the initial bundle.

Use a new feature of Angular 17 to lazy load the `TopComponent` so that it is visible _and loaded_ when the user clicks the button to display it.

When you are done, you should be able to see the `TopComponent` being loaded into the browser in a separate bundle when you click the button to display it. In Chrome, you should see this by opening the DevTools, going to the Network tab, and then clicking the button to display the `TopComponent`.

## Hints

<details>
  <summary>Hint 1</summary>

You should be able to remove the `topLoaded` signal when you are done.

</details>

<details>
  <summary>Hint 2</summary>

The new Angular feature will hide the `TopComponent` from view, but it will still be loaded in the initial bundle unless you change how both `AppComponent` and `TopComponent` are defined in their decorators. This challenge start with the old `NgModule`-based architecture, but you will need to change it to use the new feature.

</details>

<details>
  <summary>Hint 3</summary>

The new feature is [Deferrable Views](https://angular.dev/guide/defer), which provides several different triggers. One of them is ideal for this challenge.

</details>
