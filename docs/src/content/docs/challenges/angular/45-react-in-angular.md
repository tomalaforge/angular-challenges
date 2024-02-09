---
title: 🔴 React in angular
description: Challenge 45 is about learning how to benefit from the numerous libraries in React
author: Wandrille Guesdon
challengeNumber: 45
command: angular-react-in-angular
sidebar:
  order: NaN
  badge: New
---

The goal of this challenge is to use a React component inside an Angular application.

Many components are available in React, and it can be interesting to use them in an Angular application. The goal is to create a React component and use it in an Angular application.

## Information

In this challenge, we have a simple application and a react component `ReactPost` in `app/react` to illustrate a react component from a library.

## Statement

- Your task is to display the posts with the React component `ReactPost`.
- When you select a post, the post should be highlighted.

In order to play with the react component, you should start by installing the react dependencies.

```bash
npm i --save react react-dom
npm i --save-dev @types/react @types/react-dom
```

## Constraints

- Do not transform the react component in an angular component. The React component is pretty simple and can be written with ease in Angular. But **the goal is to use the React component**.

### Hint

<details>
  <summary>Hint 1 - Configuration</summary>
  Allow the React files in tsconfig.json

```
{
...
"compilerOptions": {
  ...
  "jsx": "react"
},
...
}
```

</details>

<details>
  <summary>Hint 2 - Initialization</summary>
  Create a react root with `createRoot(...)`
</details>

<details>
  <summary>Hint 3 - Display</summary>
  To render the component, it should look like this:
  
    ```
    <react root>.render(
        <React.StrictMode>
        ...
        </React.StrictMode>
    )
    ``` 
</details>

<details>
  <summary>Hint 4 - Design</summary>
  Do not forget to allow the react file in Tailwind.
</details>
