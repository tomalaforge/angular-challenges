---
title: 🟠 Component Generator
description: Challenge 26 is about creating a Nx generator to create a custom component
author: thomas-laforge
contributors:
  - tomalaforge
  - tomer953
  - Sagardevkota
  - LMFinney
challengeNumber: 26
sidebar:
  order: 116
---

## Information

Welcome to the marvelous world of Nx generators.

Generators are awesome tools that can help you and your team generate code more quickly, especially for pieces of code that you use frequently. Inside an enterprise project, you often have to create components that look similar. And most of the time, you end up copy/pasting other components. In Nx, you can create this boilerplate in a simple command using generators.

## Statement

The goal of this challenge is to create a generator that will create all the boilerplate of a component for you.

Below are the end result of your generator for a `UserComponent` associated with a `@ngrx/component-store`.

## Options

- name : name of your component/store/service
- createService: flag to tell if a http service should be created
  - yes : create as below
  - no: don't create the inject/import/effect/function call (anything related to the service call)
- inlineTemplate: flag to decide if template should be inline or in a separate file

---

`user.component.ts`

```ts
@Component({
  selector: 'app-user',
  imports: [LetDirective],
  providers: [provideComponentStore(UserStore)],
  template: `
    <ng-container *ngrxLet="vm$ as vm">// do things</ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
  private userStore = inject(UserStore);

  readonly vm$ = this.userStore.vm$;
}
```

---

`user.store.ts`

```ts
import { Injectable, inject } from '@angular/core';
import { ComponentStore, OnStateInit, OnStoreInit } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { mergeMap, pipe, tap } from 'rxjs';
import { User } from './user.model';
import { UserService } from './user.service';

export interface UserState {
  users: User[];
  loading: boolean;
  error?: string;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: undefined,
};

@Injectable()
export class UserStore extends ComponentStore<UserState> implements OnStateInit, OnStoreInit {
  private userService = inject(UserService);

  private readonly users$ = this.select((state) => state.users);
  private readonly loading$ = this.select((state) => state.loading);
  private readonly error$ = this.select((state) => state.error);

  readonly vm$ = this.select(
    {
      users: this.users$,
      loading: this.loading$,
      error: this.error$,
    },
    { debounce: true },
  );

  ngrxOnStateInit() {
    this.setState(initialState);
  }

  ngrxOnStoreInit() {
    this.loadUsers();
  }

  readonly loadUsers = this.effect<void>(
    pipe(
      tap(() => this.patchState({ loading: true })),
      mergeMap(() =>
        this.userService.loadUsers().pipe(
          tapResponse(
            (users) => this.patchState({ users, loading: false }),
            (err: string) => this.patchState({ error: err, loading: false }),
          ),
        ),
      ),
    ),
  );
}
```

---

`user.service.ts`

```ts
import { BASE_URL } from '@angular-challenges/fake-utils';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private BASE_URL = inject(BASE_URL);

  loadUsers = () => this.http.get<User[]>(`${this.BASE_URL}/users`);
}
```

---

`user.model.ts`

```ts
export interface User {
  name: string;
}
```
