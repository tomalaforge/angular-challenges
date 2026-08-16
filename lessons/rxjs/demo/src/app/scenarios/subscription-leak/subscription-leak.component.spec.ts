import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { EventLogService } from '../../core/event-log.service';
import { SubscriptionLeakComponent } from './subscription-leak.component';

describe('SubscriptionLeakComponent', () => {
  let fixture: ComponentFixture<SubscriptionLeakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionLeakComponent],
      providers: [EventLogService],
    })
      .overrideComponent(SubscriptionLeakComponent, { set: { template: '<div></div>' } })
      .compileComponents();
  });

  afterEach(() => {
    if (!fixture) return;
    const component = fixture.componentInstance;
    fixture.destroy();
    (component as unknown as { impSub?: { unsubscribe: () => void } }).impSub?.unsubscribe();
  });

  it('создаётся без ошибок', () => {
    fixture = TestBed.createComponent(SubscriptionLeakComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('после destroy имплементарный поток продолжает тикать, а reactive — нет', fakeAsync(() => {
    fixture = TestBed.createComponent(SubscriptionLeakComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    tick(500);

    const reactiveTicksBeforeDestroy = component.reaTicks();
    expect(component.impTicks()).toBeGreaterThan(0);
    fixture.destroy();
    tick(501);

    expect(component.impLeaks()).toBeGreaterThan(0);
    expect(component.reaTicks()).toBe(reactiveTicksBeforeDestroy);
  }));
});
