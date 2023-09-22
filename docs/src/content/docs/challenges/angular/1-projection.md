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

## Constraints

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
  <a
    href="https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A1+label%3Aanswer"
    alt="Projection community solutions">
    ❖ Community Answers
  </a>
  <a
    href='https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A1+label%3A"answer+author"'
    alt="Projection solution author">
    ▶︎ Author Answer
  </a>
  <a
    href="https://medium.com/@thomas.laforge/create-a-highly-customizable-component-cc3a9805e4c5"
    target="_blank"
    rel="noopener noreferrer"
    alt="Projection blog article">
    <svg aria-hidden="true" class="astro-yzt5nm4y astro-lq7oo3uf" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="--sl-icon-size: 1.5rem;"><path d="M9 10h1a1 1 0 1 0 0-2H9a1 1 0 0 0 0 2Zm0 2a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2H9Zm11-3.06a1.3 1.3 0 0 0-.06-.27v-.09c-.05-.1-.11-.2-.19-.28l-6-6a1.07 1.07 0 0 0-.28-.19h-.09a.88.88 0 0 0-.33-.11H7a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8.94Zm-6-3.53L16.59 8H15a1 1 0 0 1-1-1V5.41ZM18 19a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5v3a3 3 0 0 0 3 3h3v9Zm-3-3H9a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2Z"></path></svg>
     Blog Post
  </a>
</div>
