import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { EventLogService } from '../../core/event-log.service';
import { TRANSPORT } from '../../core/transport';
import { FastNavigationComponent } from './fast-navigation.component';

describe('FastNavigationComponent', () => {
  let fixture: ComponentFixture<FastNavigationComponent>;
  let component: FastNavigationComponent;
  let item$: Subject<{ id: number; name: string; tag: string }>;

  beforeEach(async () => {
    jest.clearAllMocks();
    item$ = new Subject();
    const fakeTransport = { getItem: jest.fn().mockReturnValue(item$) };

    await TestBed.configureTestingModule({
      imports: [FastNavigationComponent],
      providers: [{ provide: TRANSPORT, useValue: fakeTransport }, EventLogService],
    })
      .overrideComponent(FastNavigationComponent, { set: { template: '<div></div>' } })
      .compileComponents();

    fixture = TestBed.createComponent(FastNavigationComponent);
    component = fixture.componentInstance;
  });

  it('switchMap оставляет только последний эмит', () => {
    component.reaId$.next(1);
    component.reaId$.next(2);
    component.reaId$.next(3);
    item$.next({ id: 3, name: 'C', tag: 'new' });
    expect(component.reaItem()?.id).toBe(3);
  });
});
