---
title: 🟠 Structural Directive
description: Challenge 6 is about creating a structural directive to handle permissions
sidebar:
  order: 6
---

:::note
WIP: The following documentation will be reviewed and improved. However, you can still take on the challenge. If you don't understand a certain part, please feel free to reach out or create an issue.
:::

<div class="chip">Challenge #6</div>

## Information

Structural directive is an important concept you will need to master to improve your angular skills and knowledge. This will be the first part of this challenge.

Guard is also very important since you will always need it in every application you build.

## Statement

In LoginComponent, you will find 6 buttons corresponding at 6 differents users.

- Admin
- Manager
- Reader
- Writer
- Reader and Writer
- Client
- Everyone

## Step 1

In **InformationComponent**, display the correct piece of information for each roles.

### Constraints:

- no ngIf directive inside **InformationComponent**
- importing the store inside **InformationComponent** is not allowed.

You should end up with something like below:

```html
<div *hasRole="Role1">Info for Role1</div>
```

```html
<div *hasRole="['Role1', 'Role2']">Info for Role1 and Role2</div>
```

```html
<div *hasRoleSuperAdmin="true">Info Only for superadmin</div>
```

## Step 2

In **Routes.ts**, route all user to the correct **DashboardComponent** using **CanMatch** guard.

---

:::note
Start the project by running: `npx nx serve permissions`.
:::

:::tip[Reminder]
Your PR title must start with <b>Answer:6</b>.
:::

<div class="article-footer">
  <a
    href="https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A6+label%3Aanswer"
    alt="Structural Directive community solutions">
    ❖ Community Answers
  </a>
  <a
    href='https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A6+label%3A'
    alt="Structural Directive solution author">
    ▶︎ Author Answer
  </a>
  <a
    href='https://medium.com/@thomas.laforge/create-a-custom-structural-directive-to-manage-permissions-like-a-pro-11a1acad30ad'
    target="_blank"
    rel="noopener noreferrer"
    alt="Structural Directive blog article">
    <svg aria-hidden="true" class="astro-yzt5nm4y astro-lq7oo3uf" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="--sl-icon-size: 1.5rem;"><path d="M9 10h1a1 1 0 1 0 0-2H9a1 1 0 0 0 0 2Zm0 2a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2H9Zm11-3.06a1.3 1.3 0 0 0-.06-.27v-.09c-.05-.1-.11-.2-.19-.28l-6-6a1.07 1.07 0 0 0-.28-.19h-.09a.88.88 0 0 0-.33-.11H7a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8.94Zm-6-3.53L16.59 8H15a1 1 0 0 1-1-1V5.41ZM18 19a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5v3a3 3 0 0 0 3 3h3v9Zm-3-3H9a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2Z"></path></svg>
     Blog Post
  </a>
</div>
