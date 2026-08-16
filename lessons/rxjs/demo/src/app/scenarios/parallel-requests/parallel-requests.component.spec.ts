import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { EventLogService } from '../../core/event-log.service';
import { TRANSPORT } from '../../core/transport';
import { ParallelRequestsComponent } from './parallel-requests.component';

describe('ParallelRequestsComponent', () => {
  let fixture: ComponentFixture<ParallelRequestsComponent>;
  let component: ParallelRequestsComponent;
  const fakeTransport = {
    getItem: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    fakeTransport.getItem.mockImplementation((id: number) =>
      of({ id, name: `Item ${id}`, tag: 'hot' }),
    );
    await TestBed.configureTestingModule({
      imports: [ParallelRequestsComponent],
      providers: [{ provide: TRANSPORT, useValue: fakeTransport }, EventLogService],
    })
      .overrideComponent(ParallelRequestsComponent, { set: { template: '<div></div>' } })
      .compileComponents();
    fixture = TestBed.createComponent(ParallelRequestsComponent);
    component = fixture.componentInstance;
  });

  it('forkJoin вызывает transport для каждого id и дожидается всех', () => {
    component.reaFork();
    expect(fakeTransport.getItem).toHaveBeenCalledTimes(4);
    expect(component.reaCount()).toBe(4);
  });

  it('mergeMap вызывает transport для каждого id', () => {
    component.reaMerge();
    expect(fakeTransport.getItem).toHaveBeenCalledTimes(4);
    expect(component.reaCount()).toBe(4);
  });
});
