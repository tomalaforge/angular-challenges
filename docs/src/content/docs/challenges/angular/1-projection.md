---
title: 🟢 Projection
description: Challenge 1 is about learning how to project DOM element through components
sidebar:
  order: 1
---

<div class="chip">Challenge #1</div>

## Information

In Angular, content projection is a powerful technique for creating highly customizable components. Utilizing and understanding the concepts of <b>ng-content</b> and <b>ngTemplateOutlet</b> can sighificantly enhance your ability to create shareable components.

You can learn all about <b>ng-content</b> [here](https://angular.io/guide/content-projection#projecting-content-in-more-complex-environments) from simple projection to more complex ones.

To learn about <b>ngTemplateOutlet</b>, you can find the API documentation [here](https://angular.io/api/common/NgTemplateOutlet) along with some basic examples.

With this two tools in hand, you are now ready to take on the challenge.

## Statement

You will start with an fully functional application that includes a dashboard containing a teacher card and a student card. The goal is to implement the city card.

While the application works, the developer experience is far from being optimal. Every time you need to implement a new card, you have to modify the `card.component.ts`. In real-life projects, this component can be shared among many applications. The goal of the challenge is to create a `CardComponent` that can be customized without any modifications. Once you've created this component, you can begin implementing the `CityCardComponent` and ensure you are not touching the `CardComponent`.

## Constraints

- You <b>must</b> refactor the `CardComponent` and `ListItemComponent`.
- The `NgFor` directive must be declared and remain inside the `CardComponent`. You might be tempted to move it to the `CardComponent` but avoid doing so.
- `CardComponent` should not contain any `NgIf` or `NgSwitch`.
- CSS: try to avoid using `::ng-deep`. Find a better way to handle CSS styling.

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
    <svg aria-hidden="true" class="astro-yzt5nm4y astro-lq7oo3uf" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="--sl-icon-size: 1.5rem;"><path d="M9 10h1a1 1 0 1 0 0-2H9a1 1 0 0 0 0 2Zm0 2a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2H9Zm11-3.06a1.3 1.3 0 0 0-.06-.27v-.09c-.05-.1-.11-.2-.19-.28l-6-6a1.07 1.07 0 0 0-.28-.19h-.09a.88.88 0 0 0-.33-.11H7a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8.94Zm-6-3.53L16.59 8H15a1 1 0 0 1-1-1V5.41ZM18 19a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5v3a3 3 0 0 0 3 3h3v9Zm-3-3H9a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2Z"></path></svg>
     Blog Post
  </a>
    <a
    href="https://www.youtube.com/watch?v=npyEyUZxoIw&ab_channel=ArthurLannelucq"
    target="_blank"
    rel="noopener noreferrer"
    alt="Projection video by Arthur Lannelucq">
<svg aria-hidden="true" class="astro-yzt5nm4y astro-lq7oo3uf" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="--sl-icon-size: 1.5rem;"><path d="M23.5 6.2A3 3 0 0 0 21.4 4c-1.9-.5-9.4-.5-9.4-.5s-7.5 0-9.4.5A3 3 0 0 0 .5 6.3C0 8 0 12 0 12s0 4 .5 5.8A3 3 0 0 0 2.6 20c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2c.5-2 .5-5.9.5-5.9s0-4-.5-5.8zm-14 9.4V8.4l6.3 3.6-6.3 3.6z"></path></svg>
    Video 
    <span class="flag">🇫🇷<span>
  </a>
</div>
