---
title: 🟠 Harness Creation
description: Challenge 24 is about creating a component harness.
author: thomas-laforge
contributors:
  - tomalaforge
  - tomer953
  - jdegand
challengeNumber: 24
command: testing-harness-creation
sidebar:
  order: 112
---

## Information

The goal of this challenge is to create a test harness for `slider.component.ts`. The harness file, `slider.harness.ts`, has already been created.

The following API needs to be implemented:

```ts
  async clickPlus(): Promise<void> ;

  async clickMinus(): Promise<void>;

  async getValue(): Promise<number> ;

  async getMinValue(): Promise<number>;

  async disabled(): Promise<boolean>;

  async setValue(value: number): Promise<void>;
```

Additionally, you should create a `HarnessPredicate` with the default predicate and the `minValue` property.

```ts
  static with<T extends MySliderHarness>(
    this: ComponentHarnessConstructor<T>,
    options: SliderHarnessFilters = {}
  ): HarnessPredicate<T>;
```

Lastly, you will need to create the test suite for `app.component`. Some default tests have already been written, but feel free to add as many tests as you want and create as many harness methods as you need.

> Angular Material documentation can be found [here](https://material.angular.io/cdk/test-harnesses/overview).

Good luck !!! 💪
