<h1>Create a component harness</h1>

> Author: Thomas Laforge

### Information

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

> Angular Material documentation can be found [here](https://material.angular.io/cdk/test-harnesses/overview)

Good luck !!! 💪

### Submitting your work

1. Fork the project
2. clone it
3. npm install
4. `npx nx serve create-harness`
5. _...work on it_
6. Commit your work
7. Submit a PR with a title beginning with **Answer:24** that I will review and other dev can review.

<a href="https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A24+label%3Aanswer"><img src="https://img.shields.io/badge/-Solutions-green" alt="create-harness"/></a>
<a href='https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A24+label%3A"answer+author"'><img src="https://img.shields.io/badge/-Author solution-important" alt="create-harness solution author"/></a>

<!-- <a href="{Blog post url}" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/-Blog post explanation-blue" alt="create-harness blog article"/></a> -->

_You can ask any question on_ <a href="https://twitter.com/laforge_toma" target="_blank" rel="noopener noreferrer"><img src="./../../logo/twitter.svg" height=20px alt="twitter"/></a>
