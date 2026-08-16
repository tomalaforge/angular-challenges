import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { EventLogService } from '../../core/event-log.service';
import { TRANSPORT } from '../../core/transport';
import { FormSubmitComponent } from './form-submit.component';

describe('FormSubmitComponent', () => {
  let fixture: ComponentFixture<FormSubmitComponent>;
  let component: FormSubmitComponent;
  let save$: Subject<{ savedAt: number; accepted: boolean }>;
  let fakeTransport: { saveForm: jest.Mock };

  beforeEach(async () => {
    jest.clearAllMocks();
    save$ = new Subject();
    fakeTransport = { saveForm: jest.fn().mockReturnValue(save$) };

    await TestBed.configureTestingModule({
      imports: [FormSubmitComponent],
      providers: [{ provide: TRANSPORT, useValue: fakeTransport }, EventLogService],
    })
      .overrideComponent(FormSubmitComponent, { set: { template: '<div></div>' } })
      .compileComponents();

    fixture = TestBed.createComponent(FormSubmitComponent);
    component = fixture.componentInstance;
  });

  it('exhaustMap пропускает только первый клик, пока ответ не пришёл', () => {
    component.reaClick$.next();
    component.reaClick$.next();
    component.reaClick$.next();

    // Пока ответ не пришёл, transport.saveForm вызван ровно один раз.
    expect(fakeTransport.saveForm).toHaveBeenCalledTimes(1);

    save$.next({ savedAt: 1, accepted: true });
    save$.complete();

    // После complete — следующий клик снова проходит.
    component.reaClick$.next();
    expect(fakeTransport.saveForm).toHaveBeenCalledTimes(2);
  });
});
