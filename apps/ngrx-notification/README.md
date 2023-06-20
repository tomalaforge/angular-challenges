<h1>Ngrx Notification</h1>

> Author: Thomas Laforge

### Information

NgRx Effect is a very powerful library develop by the NgRx team. Effects subscribe to a HOT Observable and listen to any event dispatch from any place inside the application.

But what we often forget is that Effects can subscribe to ANY observables. Which means we can wrap a hot observable inside an effect and had logic in it.

In this exercice, we will find a way to create a very powerful, scalable and maintanable push messages listener. Currently, the code is located inside a single file with a if else condition to send the push data to the right location. This code is not very scalable since we need to add more and more else, and so not very maintanable since the piece of code will become bigger and bigger.

Also, we load the whole file at startup even if we haven't load some part of the application (lazy loading); and so we don't need to listen or update that part of the store. We need to decouple that logic.

### Step 1

create an injection token to hide the push service implementation.

### Step 2

create one ngrx effect, or component store effect for each push type, and implement your logic

### Step 3

load your effect only when necessary.
the application contain a root route, a lazy loaded route and a component with a local state (implemented with Component store)

### Submitting your work

1. Fork the project
2. clone it
3. npm ci
4. **nx serve ngrx-notification**
5. _...work on it_
6. Commit your work
7. Submit a PR with a title beginning with **Answer:7** that I will review and other dev can review.

<a href="https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A7+label%3Aanswer"><img src="https://img.shields.io/badge/-Solutions-green" alt="Ngrx notification"/></a>

<!-- TODO: uncomment when done late -->
<!-- <a href='https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A{challenge number}+label%3A"answer+author"'><img src="https://img.shields.io/badge/-Author solution-important" alt="{Project name} solution author"/></a>
<a href="{Blog post url}" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/-Blog post explanation-blue" alt="{Project name} blog article"/></a> -->

_You can ask any question on_ <a href="https://twitter.com/laforge_toma" target="_blank" rel="noopener noreferrer"><img src="./../../logo/twitter.svg" height=20px alt="twitter"/></a>
