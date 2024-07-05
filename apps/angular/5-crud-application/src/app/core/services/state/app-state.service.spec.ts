import { TestBed } from '@angular/core/testing';
import { App5StateService } from './app-state.service';

describe('App5StateService', () => {
  let service: App5StateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(App5StateService);
  });

  it('initial state should be READY with no error and no todoId', () => {
    expect(service.state).toBe('READY');
    expect(service.error).toBeNull();
    expect(service.appState().todoId).toBeNull();
  });

  it('should set state to LOADING with no todoId by default', () => {
    service.setLoading(null);
    expect(service.state).toBe('LOADING');
    expect(service.appState().todoId).toBeNull();
  });

  it('should set state to LOADING with specific todoId', () => {
    service.setLoading(1);
    expect(service.state).toBe('LOADING');
    expect(service.appState().todoId).toBe(1);
  });

  it('should set state to ERROR with message and no todoId by default', () => {
    service.setError('Error occurred', null);
    expect(service.state).toBe('ERROR');
    expect(service.error).toBe('Error occurred');
    expect(service.appState().todoId).toBeNull();
  });

  it('should set state to ERROR with message and specific todoId', () => {
    service.setError('Error occurred', 1);
    expect(service.state).toBe('ERROR');
    expect(service.error).toBe('Error occurred');
    expect(service.appState().todoId).toBe(1);
  });

  it('should return true for isStatusLoading when state is LOADING', () => {
    service.setLoading(null);
    expect(service.isStatusLoading()).toBeTruthy();
  });

  it('should return false for isStatusLoading when state is not LOADING', () => {
    service.setReady();
    expect(service.isStatusLoading()).toBeFalsy();
  });

  it('should return true for isStatusLoadingWith when state is LOADING and todoId matches', () => {
    service.setLoading(1);
    expect(service.isStatusLoadingWith(1)).toBeTruthy();
  });

  it('should return false for isStatusLoadingWith when state is LOADING but todoId does not match', () => {
    service.setLoading(1);
    expect(service.isStatusLoadingWith(2)).toBeFalsy();
  });

  it('should return true for isStatusError when state is ERROR', () => {
    service.setError('Error', null);
    expect(service.isStatusError()).toBeTruthy();
  });

  it('should return false for isStatusError when state is not ERROR', () => {
    service.setReady();
    expect(service.isStatusError()).toBeFalsy();
  });

  it('should return true for isStatusErrorWith when state is ERROR and todoId matches', () => {
    service.setError('Error', 1);
    expect(service.isStatusErrorWith(1)).toBeTruthy();
  });

  it('should return false for isStatusErrorWith when state is ERROR but todoId does not match', () => {
    service.setError('Error', 1);
    expect(service.isStatusErrorWith(2)).toBeFalsy();
  });

  it('should return true for isStatusReady when state is READY', () => {
    service.setReady();
    expect(service.isStatusReady()).toBeTruthy();
  });

  it('should return false for isStatusReady when state is not READY', () => {
    service.setLoading(null);
    expect(service.isStatusReady()).toBeFalsy();
  });
});
