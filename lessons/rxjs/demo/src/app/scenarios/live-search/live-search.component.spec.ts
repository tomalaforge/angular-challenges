import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Subject, throwError } from 'rxjs';
import { EventLogService } from '../../core/event-log.service';
import { TRANSPORT, SearchResult } from '../../core/transport';
import { LiveSearchComponent } from './live-search.component';

describe('LiveSearchComponent', () => {
  let fixture: ComponentFixture<LiveSearchComponent>;
  let component: LiveSearchComponent;
  let search$: Subject<SearchResult>;

  const fakeTransport = {
    search: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    search$ = new Subject<SearchResult>();
    fakeTransport.search.mockReturnValue(search$);

    await TestBed.configureTestingModule({
      imports: [LiveSearchComponent],
      providers: [{ provide: TRANSPORT, useValue: fakeTransport }, EventLogService],
    })
      // Не рендерим шаблон — нам важна только логика подписки.
      .overrideComponent(LiveSearchComponent, { set: { template: '<div></div>' } })
      .compileComponents();

    fixture = TestBed.createComponent(LiveSearchComponent);
    component = fixture.componentInstance;
  });

  it('switchMap отменяет предыдущий запрос, если транспорт эмитит после нового', fakeAsync(() => {
    // Эмулируем два вызова transport.search, второй перебивает первый.
    const firstCall = new Subject<SearchResult>();
    const secondCall = new Subject<SearchResult>();
    fakeTransport.search
      .mockReturnValueOnce(firstCall)
      .mockReturnValueOnce(secondCall);

    // Создаём input элементы руками, чтобы дёрнуть pipe.
    const inputEl = document.createElement('input');
    component['reaRef'] = { nativeElement: inputEl } as never;
    component.ngAfterViewInit();

    // Первый «ввод» — debounce 300мс.
    inputEl.value = 'rx';
    inputEl.dispatchEvent(new Event('input'));
    tick(300);
    expect(fakeTransport.search).toHaveBeenCalledTimes(1);
    expect(fakeTransport.search.mock.calls[0]?.[0]).toEqual({ term: 'rx' });

    // Второй «ввод» ДО ответа первого — должен перебить (switchMap отписывается от первого).
    inputEl.value = 'rxjs';
    inputEl.dispatchEvent(new Event('input'));
    tick(300);
    expect(fakeTransport.search).toHaveBeenCalledTimes(2);
    expect(fakeTransport.search.mock.calls[1]?.[0]).toEqual({ term: 'rxjs' });

    // Ответ на ПЕРВЫЙ (отменённый) приходит после второго — не должен попасть в результат.
    firstCall.next({ term: 'rx', items: [], echoedAt: 0 });
    firstCall.complete();
    tick();

    // Ответ на второй — должен попасть.
    secondCall.next({ term: 'rxjs', items: [{ id: 1, name: 'a', tag: 'hot' }], echoedAt: 1 });
    secondCall.complete();
    tick();

    expect(component.reaResult()?.term).toBe('rxjs');
  }));

  it('error из transport попадает в impResult = null', () => {
    // Императивный путь — без afterViewInit, сразу дёргаем обработчик.
    const err = new Error('boom');
    fakeTransport.search.mockReturnValue(throwError(() => err));

    component.onImpInput('fail');

    expect(component.impResult()).toBeNull();
  });
});
