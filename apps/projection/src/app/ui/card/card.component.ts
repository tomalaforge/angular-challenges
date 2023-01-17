import { AsyncPipe, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  Input,
  OnInit,
  TemplateRef,
  inject,
} from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { BaseCardItem, LocalStore } from '../../data-access/local-store';
import { CardType } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';
import { randomizer } from './../../data-access/fake-http.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styles: [
    `
      .card-inner {
        background-color: var(--bg-color);
      }
    `,
  ],
  standalone: true,
  imports: [NgIf, NgFor, NgTemplateOutlet, AsyncPipe, ListItemComponent],
  providers: [LocalStore],
})
export class CardComponent implements OnInit {
  @Input() cardType!: CardType;
  @Input() type!: CardType;
  @Input() labelKey!: string;

  @ContentChild('image') template!: TemplateRef<HTMLImageElement>;

  private http = inject(FakeHttpService);
  private store = inject(LocalStore);
  data$!: Observable<BaseCardItem[]>;

  ngOnInit() {
    this.data$ = this.http.fetch(this.cardType).pipe(
      tap((data) => this.store.set(data)),
      switchMap(() => this.store.getState()),
      tap((da) => console.log('da', da))
    );
  }

  addNewItem() {
    const item = randomizer[this.cardType]();
    this.store.add(item);
  }

  onItemRemove(id: number) {
    this.store.remove(id);
  }
}
