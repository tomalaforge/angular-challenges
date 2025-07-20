---
title: 🟠 High Order Operator Bug
description: Challenge 11 is about resolving a Rxjs bug because of high order operators
author: thomas-laforge
contributors:
  - tomalaforge
  - LMFinney
challengeNumber: 11
command: rxjs-high-order-operator-bug
sidebar:
  order: 114
---

Let's dive inside the wonderful word of RxJS.

This challenge is inspired by a real-life example.

## Information

### User Story

We need a button for each `Topic`. When we click on it, we delete all objects with this `Topic` in our database _(Fake DB in our case)_. Finally, we display **All [topic] have been deleted** if everything was deleted successfully or **Error: deletion of some [topic] failed** if some deletions failed

### Constraints

We can only pass one object to our DB for deletion at the time. The DB will respond true if the data was successfully deleted and false otherwise.

### Statement

The QA team reports a **bug**. The UI shows **All [topic] have been deleted** all the time, even if some deletions fail.

👉 Spot the bug and correct it.
