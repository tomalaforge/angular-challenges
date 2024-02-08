import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'thumbnail-header',
  standalone: true,
  imports: [NgOptimizedImage],
  template: `
    <div class="flex gap-3">
      <img
        ngSrc="assets/profil.webp"
        alt=""
        class="rounded-full border border-black p-0.5"
        width="50"
        height="50"
        [style.view-transition-name]="'profil' + id()" />
      <div class="flex flex-col justify-center gap-0.5">
        <span class="text-md font-bold uppercase">Thomas Laforge</span>
        <span class="text-sm">{{ date() }}</span>
      </div>
    </div>
    <img
      ngSrc="assets/angular.webp"
      alt=""
      width="50"
      height="50"
      [style.view-transition-name]="'angular' + id()" />
  `,
  host: {
    class: 'flex w-full px-4 py-5 gap-4 justify-between',
  },
})
export class ThumbnailHeaderComponent {
  date = input.required<string>();
  id = input.required<string>();
}

/* 
// if you add any transition tag in this component, there will be a duplicate warning.  
// Even if you try to use a class, there will be a duplicate warning.  You can't directly set the transition name here.
// This component is rendered multiple times, but it is not in a loop.
// You can't use an implementation like the thumbnail component and add an index or id to the name.  
// I think you need to call a function when the back button is clicked and assign the elements in this component
// with the transition names previously defined.  
// Probably need to remove the transition name from the other element as well. 
// If you don't, there will probably be duplicate warning and the animation will not work.   
// Other ideas to explore:
// Clip path ?
// applicationRef.tick   
// https://developer.chrome.com/docs/web-platform/view-transitions#changing-on-navigation-type
*/
