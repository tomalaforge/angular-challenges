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
3. npm ci
4. **nx serve permissions**
5. _...work on it_
6. Commit your work
7. Submit a PR with a title beginning with **Answer:6** that I will review and other dev can review.

<a href="https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A6+label%3Aanswer"><img src="https://img.shields.io/badge/-Solutions-green" alt="permissions"/></a>
<a href='https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A6+label%3A"answer+author"'><img src="https://img.shields.io/badge/-Author solution-important" alt="permissions solution author"/></a>
<a href="https://medium.com/@thomas.laforge/create-a-custom-structural-directive-to-manage-permissions-like-a-pro-11a1acad30ad" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/-Blog post explanation: part 1 directives-blue" alt="permissions directive blog article"/></a>
<a href="https://medium.com/@thomas.laforge/create-a-route-guard-to-manage-permissions-26f16cc9a1ca" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/-Blog post explanation: part 2 guards-blue" alt="permissions guard blog article"/></a>

_You can ask any question on_ <a href="https://twitter.com/laforge_toma" target="_blank" rel="noopener noreferrer"><img src="./../../logo/twitter.svg" height=20px alt="twitter"/></a>
