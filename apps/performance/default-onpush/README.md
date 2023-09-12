<h1>OnPush to optimize Change Detection</h1>

> Author: Thomas Laforge

### Information

In this series of challenges, you will learn how to optimize and enhance the performance of your Angular Application.

The first step is to download the [Angular DevTools Chrome extention](https://chrome.google.com/webstore/detail/angular-devtools/ienfalfjdbdpebioblfackkekamfmbnh) if you haven't already done so. This extension allows you to profile your application and detect performance issues.

In this challenge, we will explore the differences and impacts of using `ChangeDetectionStrategy.Default` versus `ChangeDetectionStrategy.OnPush`. To provide a clearer demonstration, I have added color enlightment to each component and each row in our application. However, in real-world scenarios, you will not have such visualization. This is where the Angular DevTool profiler comes to the rescue.

Start by serving this application by running: `npx nx serve performance-default-onpush` inside your terminal. Then open Chrome DevTool by pressing **F12** and switch to the Angular Tab. From there you can select the Profiler tab as shown below.

![profiler tab](./img/profiler-tab.png 'Profiler tab')

Start profiling your application and type some letters inside the input field. You will notice that each element of your application will flash at each change detection cycle and the profiler will show you a bar for each change detection cycle.

If you click on one of the bars (indicated by the yellow arrow on the picture below), you can see that `PersonListComponent`, `RandomComponent` and all the `MatListItem` are impacted by the change detection cycle, even when we only interact with the input field.

![profiler record](./img/profiler-record.png 'Profiler Record')

### Statement

The goal of this challenge is to improve the clustering of change detection within the application.

### Hints:

<details>
  <summary>Hint 1</summary>

Use `ChangeDetectionStrategy.OnPush` but this will not be enough.

</details>

<details>
  <summary>Hint 2</summary>

Create smaller components to better separate the input field from the list.

</details>

### Submitting your work

1. Fork the project
2. clone it
3. npm ci
4. `npx nx serve performance-default-onpush`
5. _...work on it_
6. Commit your work
7. Submit a PR with a title beginning with **Answer:34** that I will review and other dev can review.

<a href="https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A34+label%3Aanswer"><img src="https://img.shields.io/badge/-Solutions-green" alt="performance-default-onpush"/></a>
<a href='https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A34+label%3A"answer+author"'><img src="https://img.shields.io/badge/-Author solution-important" alt="performance-default-onpush solution author"/></a>

<!-- <a href="{Blog post url}" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/-Blog post explanation-blue" alt="performance-default-onpush blog article"/></a>  -->

_You can ask any question on_ <a href="https://twitter.com/laforge_toma" target="_blank" rel="noopener noreferrer"><img src="./../../../logo/twitter.svg" height=20px alt="twitter"/></a>
