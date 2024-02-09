import { AfterViewInit, Component, ElementRef, EventEmitter, input, OnChanges, Output, ViewChild } from '@angular/core';
import { createRoot, Root } from 'react-dom/client';
import React from 'react';
import ReactPost from './ReactPost';

type Post = { title: string; description: string, pictureLink: string };


@Component({
  standalone: true,
  selector: 'app-post',
  template: `
    <div #react></div>`,
  styles: ['']
})
export class PostComponent implements AfterViewInit, OnChanges {
  @ViewChild('react', { static: true }) containerRef!: ElementRef;

  post = input<Post | undefined>(undefined);
  isSelected = input<boolean>(false);
  @Output() selectPost = new EventEmitter<void>();
  root?: Root;

  ngOnChanges(): void {
    this.render();
  }

  ngAfterViewInit() {
    this.root = createRoot(this.containerRef.nativeElement);
    this.render();
  }

  private render() {
    if (this.root) {
      this.root.render(
        <React.StrictMode>
          <ReactPost
            title={this.post()?.title}
            description={this.post()?.description}
            pictureLink={this.post()?.pictureLink}
            handleClick={() => this.selectPost.emit()}
            selected={this.isSelected()}
          />
        </React.StrictMode>
      );
    }
  }
}
