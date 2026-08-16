import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { defer, of, throwError } from 'rxjs';
import { EventLogService } from '../../core/event-log.service';
import { TRANSPORT } from '../../core/transport';
import { LoadingDataErrorComponent } from './loading-data-error.component';

describe('LoadingDataErrorComponent', () => {
  let fixture: ComponentFixture<LoadingDataErrorComponent>;
  let component: LoadingDataErrorComponent;
  const fakeTransport = { getItem: jest.fn() };

  beforeEach(async () => {
    jest.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [LoadingDataErrorComponent],
      providers: [{ provide: TRANSPORT, useValue: fakeTransport }, EventLogService],
    })
      .overrideComponent(LoadingDataErrorComponent, { set: { template: '<div></div>' } })
      .compileComponents();
    fixture = TestBed.createComponent(LoadingDataErrorComponent);
    component = fixture.componentInstance;
  });

  it('reactive: успех после 2 retry → state.data', fakeAsync(() => {
    let attempts = 0;
    fakeTransport.getItem.mockReturnValue(
      defer(() => {
        attempts += 1;
        return attempts < 3
          ? throwError(() => new Error(`e${attempts}`))
          : of({ id: 7, name: 'OK', tag: 'hot' });
      }),
    );

    component.reaClick$.next();
    tick(1000);

    expect(component.reaState().kind).toBe('data');
  }));

  it('reactive: 3 ошибки подряд → state.error', fakeAsync(() => {
    fakeTransport.getItem.mockReturnValue(throwError(() => new Error('boom')));

    component.reaClick$.next();
    tick(1000);

    expect(component.reaState().kind).toBe('error');
  }));
});
