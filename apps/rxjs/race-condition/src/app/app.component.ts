import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AsyncSubject, fromEvent, switchMap, take } from 'rxjs';
import { TopicModalComponent } from './topic-dialog.component';
import { TopicService, TopicType } from './topic.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  selector: 'app-root',
  template: ` <button #btn>Open Topic</button> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'rxjs-race-condition';
  dialog = inject(MatDialog);
  topicService = inject(TopicService);
  destroyRef = inject(DestroyRef);
  topics$ = new AsyncSubject<TopicType[]>();

  @ViewChild('btn', { static: true }) public btnRef!: ElementRef;

  public ngOnInit(): void {
    this.topicService.fakeGetHttpTopic().pipe(take(1)).subscribe(this.topics$);
  }

  public ngAfterViewInit(): void {
    fromEvent(this.btnRef.nativeElement, 'click')
      .pipe(
        switchMap(() => this.topics$),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((topics: TopicType[]) => {
        this.openTopicModal(topics);
      });
  }

  public openTopicModal(topics: TopicType[]) {
    this.dialog.open(TopicModalComponent, {
      data: {
        topics,
      },
    });
  }
}
