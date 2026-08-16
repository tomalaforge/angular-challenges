import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { EventLogService } from '../../core/event-log.service';
import { TRANSPORT } from '../../core/transport';
import { FiltersUrlComponent } from './filters-url.component';

describe('FiltersUrlComponent', () => {
  const fakeTransport = { getFilteredItems: jest.fn() };

  beforeEach(async () => {
    jest.clearAllMocks();
    fakeTransport.getFilteredItems.mockReturnValue(of([]));
    await TestBed.configureTestingModule({
      imports: [FiltersUrlComponent],
      providers: [{ provide: TRANSPORT, useValue: fakeTransport }, EventLogService],
    })
      .overrideComponent(FiltersUrlComponent, { set: { template: '<div></div>' } })
      .compileComponents();
    TestBed.createComponent(FiltersUrlComponent);
  });

  it('startWith на всех трёх потоках гарантирует первый эмит без ожидания', () => {
    // До любых .next() combineLatest должен сработать благодаря startWith.
    // transport вызывается минимум один раз.
    expect(fakeTransport.getFilteredItems).toHaveBeenCalled();
  });
});
