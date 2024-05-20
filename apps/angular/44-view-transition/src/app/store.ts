import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  type,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { setAllEntities, withEntities } from '@ngrx/signals/entities';
import { posts } from './data';
import { Post } from './post.model';

export interface BlogState {
  scrollY: number;
  selectedPost: Post | undefined;
}

const initialState: BlogState = {
  scrollY: 0,
  selectedPost: undefined,
};

export const BlogStore = signalStore(
  { providedIn: 'root' },
  withEntities({ entity: type<Post>(), collection: 'post' }),
  withState(initialState),
  withComputed(({ postEntities, selectedPost }) => ({
    selectedPostIndex: computed(() =>
      postEntities().findIndex((p) => p.id === selectedPost()?.id),
    ),
  })),
  withMethods((store) => ({
    loadAll() {
      patchState(store, setAllEntities(posts, { collection: 'post' }));
    },
    updateSelectedPostById(id: number | string) {
      const selectedPost = store.postEntities().find((p) => p.id === id);
      patchState(store, { selectedPost });
    },
    getPostById(id: number | string) {
      return store.postEntities().find((p) => p.id === id);
    },
    saveBlogScrollY() {
      patchState(store, { scrollY: window.scrollY });
    },
  })),
  withHooks({
    onInit(store) {
      store.loadAll();
    },
  }),
);
