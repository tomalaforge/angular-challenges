# React in angular

> author: wandrille-guesdon

### Run Application

```bash
npx nx serve angular-react-in-angular
```

### Documentation and Instruction

Challenge documentation is [here](https://angular-challenges.vercel.app/challenges/angular/45-react-in-angular/).

## CDN

<script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>

## Notes

- ViewChild typically used to get reference to the DOM element. `viewChild` signal is being added to Angular soon.
- You need a wrapper component for the div with the `root` id.
- Instead of lifecycle methods -> use computed or effect ?

## Useful Resources

- [Medium](https://medium.com/@zacky_14189/embedding-react-components-in-angular-the-easy-way-60f796b68aef)
- [Medium](https://web-world.medium.com/how-to-use-react-web-components-in-angular-b3ac7e39fd17)
- [Copycat](https://www.copycat.dev/blog/reactjs-cdn/)
- [Github](https://github.com/aligneddev/angular-plus-react)
- [Medium](https://medium.com/angularwave/lazy-loading-libs-from-cdn-in-angular-cdd5a6a32ed5)
- [Medium](https://netbasal.com/using-react-in-angular-applications-1bb907ecac91)
- [YouTube](https://www.youtube.com/watch?v=FAFELX9WPP8) - React in Angular | Write React in Angular code | Angular 14
- [StackBlitz](https://stackblitz.com/edit/angular-di-youtube?file=src%2Fapp%2Fapp.component.ts)
