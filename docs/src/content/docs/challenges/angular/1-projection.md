---
title: 🟢 Projection
description: Challenge 1 is about learning how to project DOM element through components
---

<div class="chip">Challenge #1</div>

## Information

In Angular, content projection is a powerful technique for creating highly customizable components. Utilizing and understanding the concepts of <b>ng-content</b> and <b>ngTemplateOutlet</b> can sighificantly enhance your ability to create shareable components.

You can learn all about <b>ng-content</b> [here](https://angular.io/guide/content-projection#projecting-content-in-more-complex-environments) from simple projection to more complex ones.

To learn about <b>ngTemplateOutlet</b>, you can find the API documentation [here](https://angular.io/api/common/NgTemplateOutlet) along with some basic examples.

With this two tools in hand, you are now ready to take on the challenge.

## Statement

You will start with an fully functional application that includes a dashboard containing a teacher card and a student card. The goal is to implement the city card.

While the application works, the developer experience is far from being optimal. Every time you need to implement a new card, you have to modify the `card.component.ts`. In real-life projects, this component can be shared among many applications. The goal of the challenge is to create a <b>CardComponent</b> that can be customized without any modifications. Once you've created this component, you can begin implementing the <b>CityCardComponent</b> and ensure you are not touching the <b>CardComponent</b>.

## Constraints:

- You <b>must</b> refactor the <b>CardComponent</b> and <b>ListItemComponent</b>.
- The <b>NgFor</b> directive must be declared and remain inside the <b>CardComponent</b>. You might be tempted to move it to the <b>CardComponent</b> but avoid doing so.
- <b>CardComponent</b> should not contain any <b>NgIf</b> or <b>NgSwitch</b>.
- CSS: try to avoid using <b>::ng-deep</b>. Find a better way to handle CSS styling.

---

:::note
Start the project by running: `npx nx serve projection`.
:::

:::tip[Reminder]
Your PR title must start with <b>Answer:1</b>.
:::

<div class="article-footer">
  <a href="https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A1+label%3Aanswer" alt="Projection community solutions"> Community solutions
  </a>
  <a href='https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A1+label%3A"answer+author"' alt="Projection solution author"> Author solution
  </a>
  <a
    href="https://medium.com/@thomas.laforge/create-a-highly-customizable-component-cc3a9805e4c5"
    target="_blank"
    rel="noopener noreferrer"
     alt="Projection blog article">
  Blog Post
  </a>
</div>
