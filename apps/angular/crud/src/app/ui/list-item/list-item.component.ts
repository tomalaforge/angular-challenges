import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  input,
  output,
} from '@angular/core';
import { LetDirective } from '@ngrx/component';
import { ListItemTemplateDirective } from '../../shared/directive/list-item-template.directive';
import { LoadingStatePipe } from '../../shared/pipe/loading-state.pipe';
import { LoadingState } from '../../shared/state/loading.feature';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  standalone: true,
  imports: [NgTemplateOutlet, LoaderComponent, LoadingStatePipe, LetDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent {
  loadingState = input.required<LoadingState>();
  onUpdate = output();
  onDelete = output();

  @ContentChild(ListItemTemplateDirective)
  itemContentTemplate?: ListItemTemplateDirective;
}
