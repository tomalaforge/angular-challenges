# View Transition

> author: thomas-laforge

### Run Application

```bash
npx nx serve angular-view-transition
```

### Documentation and Instruction

Challenge documentation is [here](https://angular-challenges.vercel.app/challenges/angular/44-view-transition/).

## Notes

- `view-transition` can be seen between the html and head tags.
- Browser console -> More Tools -> animations -> then you can see all the animations
- Tom's video -> was it zoomed out ?
- `view-transitions` are a progressive enhancement.
- `view-transition` has to be defined in global style file.
- `view-transition` api only works with SPA's for now.
- `view-transition` api piggybacks off router ? Router has a ton of events you can listen to.
- When the old screenshot is the `only-child`, we know this is an `exit` transition because there is no new screenshot in the `image-pair`.
- Need explicit widths and heights for the animations to work properly. Dimensions can't be computed in time for the event loop ?
- Need to add `back-transition` on the document itself -> other elements are replaced in the dom ?
- Using a binding (`[style.view-transition-name]="name"`) seems more unforgiving and less mutable.
- Have to be pretty much pixel perfect for the illusion to work.
- `Just in Time` -> you have small window to use javascript to manipulate the animation.
- Not mobile responsive.

## Useful Resources

- [Medium](https://blog.angular.io/check-out-angulars-support-for-the-view-transitions-api-3937376cfc19) - check out angulars support for the view transitions api
- [Stack Overflow](https://stackoverflow.com/questions/16546350/is-there-a-way-to-make-css-animation-work-diagonally) - is there a way to make css animation work diagonally
- [Angular Docs](https://angular.io/guide/route-animations) - route animations
- [Blog](https://chriscoyier.net/2023/01/16/intuitive-list-item-transitions-with-the-view-transitions-api/) - intuitive list item transitions with the view transitions api
- [Tailwind](https://tailwindcss.com/docs/padding) - padding
- [YouTube](https://www.youtube.com/watch?v=5K5wNqCUrL8) - Seamless Page Navigation With the View Transitions API (with Maxi Ferreira)
- [Reddit](https://www.reddit.com/r/typescript/comments/v5hzws/property_classname_does_not_exist_on_type/?rdt=48607) - property classname does not exist on type
