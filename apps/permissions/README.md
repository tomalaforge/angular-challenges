<h1>Permissions</h1>

> Author: Thomas Laforge

### Information

Structural directive is an important concept you will need to master to improve your angular skills and knowledge. This will be the first part of this challenge.

Guard is also very important since you will always need it in every application you build.

### Statement

In LoginComponent, you will find 6 buttons corresponding at 6 differents users.

- Admin
- Manager
- Reader
- Writer
- Reader and Writer
- Client
- Everyone

### Step 1

In **InformationComponent**, display the correct piece of information for each roles.

#### Constraints:

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

### Step 2

In **Routes.ts**, route all user to the correct **DashboardComponent** using **CanMatch** guard.

### Submitting your work

1. Fork the project
2. clone it
3. npm install
4. **nx serve permissions**
5. _...work on it_
6. Commit your work
7. Submit a PR with a title beginning with **Answer:6** that I will review and other dev can review.

<a href="https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A6+label%3Aanswer"><img src="https://img.shields.io/badge/-Solutions-green" alt="permissions"/></a>

<!-- TODO: uncomment when done late -->
<!-- <a href='https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A{challenge number}+label%3A"answer+author"'><img src="https://img.shields.io/badge/-Author solution-important" alt="{Project name} solution author"/></a>
<a href="{Blog post url}" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/-Blog post explanation-blue" alt="{Project name} blog article"/></a> -->

_You can ask any question on_ <a href="https://twitter.com/laforge_toma" target="_blank" rel="noopener noreferrer"><img src="./../../logo/twitter.svg" height=20px alt="twitter"/></a>
