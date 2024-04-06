import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LoadingStatePipe } from '../../shared/pipe/loading-state.pipe';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

describe('ListItemComponent', () => {
  let component: ListItemComponent;
  let fixture: ComponentFixture<ListItemComponent>;
  let updateBtn: HTMLButtonElement;
  let deleteBtn: HTMLButtonElement;
  let loaderEl: DebugElement;
  let errorEl: HTMLDivElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingStatePipe],
    }).compileComponents();

    fixture = TestBed.createComponent(ListItemComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('loadingState', 'init');
    fixture.detectChanges();

    updateBtn = fixture.debugElement.query(By.css('#btn-update')).nativeElement;
    deleteBtn = fixture.debugElement.query(By.css('#btn-delete')).nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display NOT disabled update and delete button when state is "init"', () => {
    fixture.componentRef.setInput('loadingState', 'init');
    fixture.detectChanges();

    loaderEl = fixture.debugElement.query(By.css('.loader'));

    expect(updateBtn.disabled).toBeFalsy();
    expect(deleteBtn.disabled).toBeFalsy();
    expect(loaderEl).toBeNull();
  });

  it('should display disabled update, delete button and loader when state is "loading"', () => {
    fixture.componentRef.setInput('loadingState', 'loading');
    fixture.detectChanges();

    loaderEl = fixture.debugElement.query(By.css('.loader'));

    expect(updateBtn.disabled).toBeTruthy();
    expect(deleteBtn.disabled).toBeTruthy();
    expect(loaderEl).toBeDefined();
  });

  it('should display loader component when state contains error', () => {
    fixture.componentRef.setInput('loadingState', {
      error: 'An error occured.',
    });
    fixture.detectChanges();

    errorEl = fixture.debugElement.query(By.css('.error')).nativeElement;

    expect(errorEl).toBeDefined();
    expect(errorEl.innerHTML).toContain('An error occured.');
  });
});
