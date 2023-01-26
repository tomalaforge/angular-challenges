<h1>BUG: RxJs chaining operators</h1>

> Author: Thomas Laforge

Let's dive inside the wonderful word of RxJs.

This challenge is inspired by a real-life example.

### Presentation of the challenge

#### User Story

We need a button for each `Topic`. When we click on it, we delete all objects with this `Topic` in our database _(Fake DB in our case)_. Finally we display **All [topic] have been deleted** is everything was deleted successfully or **Error: deletion of some [topic] failed** if some deletions failed

#### Constraints:

We can only pass one object to our DB for deletion at the time. The DB will respond true if the data was successfully deleted and false otherwise.

### What you need to do

The QA team reports a **bug**. The UI shows **All [topic] have been deleted** all the time, even if some deletions fail.

👉 Spot the bug and correct it.

### Submitting your work

1. Fork the project
2. clone it
3. npm install
4. `npx nx serve rxjs-pipe-bug`
5. _...work on it_
6. Commit your work
7. Submit a PR with a title beginning with **Answer:11** that I will review and other dev can review.

<a href="https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A11+label%3Aanswer"><img src="https://img.shields.io/badge/-Solutions-green" alt="Rxjs pipe bug"/></a>

<a href='https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A11+label%3A"answer+author"'><img src="https://img.shields.io/badge/-Author solution-important" alt="Rxjs pipe bug solution author"/></a>

<!-- <a href="{Blog post url}" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/-Blog post explanation-blue" alt="{Project name} blog article"/></a> -->

_You can ask any question on_ <a href="https://twitter.com/laforge_toma" target="_blank" rel="noopener noreferrer"><img src="./../../logo/twitter.svg" height=20px alt="twitter"/></a>
