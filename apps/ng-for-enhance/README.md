<h1>Directive enhance</h1>

## Information

Directive is a very powerful tool only offered by the Angular framework. You can apply the DRY principal by having shared logic inside a directive and applying it to any component you want.

But the real power is that you can enhance an already existing directive which moreover doesn't **belong** to you.

## Statement

In this exercice, we have a want to display a list of persons. If the list is empty, you must display _" the list is empty !! "_.

Currently we have :

```typescript
    <ng-container *ngIf="persons.length > 0; else emptyList">
      <div *ngFor="let person of persons">
        {{ person.name }}
      </div>
    </ng-container>
    <ng-template #emptyList>The list is empty !!</ng-template>
```

We want to get rid of the ng-container by writing :

```typescript
    <div *ngFor="let person of persons; empty: emptyList">
    {{ person.name }}
    </div>
    <ng-template #emptyList>The list is empty !!</ng-template>
```

The goal is to **improve the ngFor directive**

## Submitting your work

1. Fork the project
2. clone it
3. npm install
4. **nx serve ng-for-enhance**
5. _...work On it_
6. Commit your work
7. Submit a PR with a title beginning with **Answer:3** that I will review and other dev can review.

<a href="https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A3+label%3Aanswer" target="_blank"><img src="https://img.shields.io/badge/-Solutions-green" alt="Directive enhance"/></a>

_You can ask any question on_ <a href="https://twitter.com/laforge_toma" target="_blank"><img src="./../../logo/twitter.svg" height=20px alt="Twitter"/></a>
