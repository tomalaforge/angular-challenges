import { AfterViewInit, Component, ElementRef, EventEmitter, input, OnChanges, OnDestroy, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import * as React from "react";
import * as ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import ReactPost from './ReactPost';

type Post = { title: string; description: string; pictureLink: string };

const containerElementName = "reactPostComponentContainer";

// this is the wrapper component

@Component({
  standalone: true,
  selector: 'app-post',
  template: `
    <div #${containerElementName}></div>
  `,
  styles: [''],
  encapsulation: ViewEncapsulation.None
})
export class PostComponent implements OnChanges, OnDestroy, AfterViewInit {
  post = input<Post | undefined>(undefined);
  isSelected = input<boolean>(true);
  @Output() selectPost = new EventEmitter<void>();
  @ViewChild(containerElementName, { static: true }) containerRef!: ElementRef;

  constructor() { }
  ngOnChanges() {
    this.render();
  }

  ngAfterViewInit() {
    this.render();
  }

  ngOnDestroy() {
    ReactDOM.unmountComponentAtNode(this.containerRef.nativeElement);
  }

  // need to change file to `tsx` -> otherwise React.StrictMode is being referred to as a type error
  // the pictures seem to load slow because the root is rendered twice?
  private render() {
    const root = createRoot(this.containerRef.nativeElement as HTMLElement);
    root.render(
      <React.StrictMode>
        <ReactPost description={this.post()?.description} pictureLink={this.post()?.pictureLink} title={this.post()?.title}  handleClick={()=> this.selectPost} selected={this.isSelected()} /> 
      </React.StrictMode>
    );
  }

}
