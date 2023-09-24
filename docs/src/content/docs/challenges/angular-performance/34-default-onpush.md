---
title: 🟢 Default vs OnPush
description: Challenge 34 is about learning the difference between Default and OnPush Change Detection Strategy.
---

:::note
WIP
:::

<div class="chip">Challenge #34</div>

### Information

In this series of challenges, you will learn how to optimize and enhance the performance of your Angular Application.

The first step is to download the [Angular DevTools Chrome extention](https://chrome.google.com/webstore/detail/angular-devtools/ienfalfjdbdpebioblfackkekamfmbnh) if you haven't already done so. This extension allows you to profile your application and detect performance issues.

In this challenge, we will explore the differences and impacts of using `ChangeDetectionStrategy.Default` versus `ChangeDetectionStrategy.OnPush`. To provide a clearer demonstration, I have added color enlightment to each component and each row in our application. However, in real-world scenarios, you will not have such visualization. This is where the Angular DevTool profiler comes to the rescue.

Start by serving this application by running: `npx nx serve performance-default-onpush` inside your terminal. Then open Chrome DevTool by pressing **F12** and switch to the Angular Tab. From there you can select the Profiler tab as shown below.

![profiler tab](../../../../assets/34/profiler-tab.png 'Profiler tab')

Start profiling your application and type some letters inside the input field. You will notice that each element of your application will flash at each change detection cycle and the profiler will show you a bar for each change detection cycle.

If you click on one of the bars (indicated by the yellow arrow on the picture below), you can see that `PersonListComponent`, `RandomComponent` and all the `MatListItem` are impacted by the change detection cycle, even when we only interact with the input field.

![profiler record](../../../../assets/34/profiler-record.png 'Profiler Record')

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

---

:::note
Start the project by running: `npx nx serve performance-default-onpush`.
:::

:::tip[Reminder]
Your PR title must start with <b>Answer:34</b>.
:::

<div class="article-footer">
  <a
    href="https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A34+label%3Aanswer"
    alt="Default vs OnPush community solutions">
    ❖ Community Answers
  </a>
  <a
    href='https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A34+label%3A'
    alt="Default vs OnPush solution author">
    ▶︎ Author Answer
  </a>
  </div>
