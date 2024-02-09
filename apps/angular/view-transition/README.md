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
- `view-transition` has to be defined in the `global` style file.
- `view-transition` api only works with SPA's (for now).
- `view-transition` api piggybacks off router ? Router has a ton of events you can listen to.
- When the old screenshot is the `only-child`, we know this is an `exit` transition because there is no new screenshot in the `image-pair`.
- Need explicit widths and heights for the animations to work properly. Dimensions can't be computed in time for the event loop ?
- Need to add `back-transition` on the document itself -> other elements are replaced in the dom. You can inject the `DOCUMENT` into your component.
- Have to be pretty much pixel perfect for the illusion to work.
- `Just in Time` -> you have small window to use javascript to manipulate the animation.
- Not mobile responsive.
- I did my animations on the detail page. I couldn't target the correct post because the middle view didn't have an id. I added one later on.
- Animations can be segmented to happen only for each item, but the profile picture is higher on the page than its final resting place. How to account for the height difference? I duplicated animations to change the `transformY` values. The images are different and it needs to be pixel perfect to make it look like the image doesn't move when it re-renders after
  the animation ends.
- My solution is not best practice. Imperative solution. Duplicated selectors and animations. Absolute pixel values. Not mobile responsive. I didn't make the transition names distinctive. I just added `a` for the different name.
- When you have many items, you can't really do it this way.

## Useful Resources

- [Chrome Docs](https://developer.chrome.com/docs/web-platform/view-transitions#changing-on-navigation-type) - changing on navigation type
- [Medium](https://blog.angular.io/check-out-angulars-support-for-the-view-transitions-api-3937376cfc19) - check out angulars support for the view transitions api
- [Stack Overflow](https://stackoverflow.com/questions/16546350/is-there-a-way-to-make-css-animation-work-diagonally) - is there a way to make css animation work diagonally
- [Angular Docs](https://angular.io/guide/route-animations) - route animations
- [Blog](https://chriscoyier.net/2023/01/16/intuitive-list-item-transitions-with-the-view-transitions-api/) - intuitive list item transitions with the view transitions api
- [Tailwind](https://tailwindcss.com/docs/padding) - padding
- [YouTube](https://www.youtube.com/watch?v=5K5wNqCUrL8) - Seamless Page Navigation With the View Transitions API (with Maxi Ferreira)
- [Reddit](https://www.reddit.com/r/typescript/comments/v5hzws/property_classname_does_not_exist_on_type/?rdt=48607) - property classname does not exist on type
