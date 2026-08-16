import { ComponentFixture, TestBed } from '@angular/core/testing';
import { defer, of } from 'rxjs';
import { EventLogService } from '../../core/event-log.service';
import { TRANSPORT } from '../../core/transport';
import { ConfigCacheComponent } from './config-cache.component';

describe('ConfigCacheComponent', () => {
  let fixture: ComponentFixture<ConfigCacheComponent>;
  let component: ConfigCacheComponent;
  let networkRequests: number;
  const fakeTransport = { getConfig: jest.fn() };

  beforeEach(async () => {
    jest.clearAllMocks();
    networkRequests = 0;
    fakeTransport.getConfig.mockImplementation(() =>
      defer(() => {
        networkRequests += 1;
        return of({ id: 'x', name: 'X', price: 1 });
      }),
    );
    await TestBed.configureTestingModule({
      imports: [ConfigCacheComponent],
      providers: [{ provide: TRANSPORT, useValue: fakeTransport }, EventLogService],
    })
      .overrideComponent(ConfigCacheComponent, { set: { template: '<div></div>' } })
      .compileComponents();
    fixture = TestBed.createComponent(ConfigCacheComponent);
    component = fixture.componentInstance;
  });

  it('imp: 2 подписчика → 2 сетевых запроса', () => {
    component.impSubscribe();
    component.impSubscribe();

    expect(fakeTransport.getConfig).toHaveBeenCalledTimes(2);
    expect(networkRequests).toBe(2);
  });

  it('rea: 2 подписчика → 1 сетевой запрос (shareReplay)', () => {
    component.reaSubscribe();
    component.reaSubscribe();

    expect(fakeTransport.getConfig).toHaveBeenCalledTimes(1);
    expect(networkRequests).toBe(1);
  });
});
