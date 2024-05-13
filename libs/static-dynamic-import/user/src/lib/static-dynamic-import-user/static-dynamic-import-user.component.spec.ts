import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StaticDynamicImportUserComponent } from './static-dynamic-import-user.component';

describe('StaticDynamicImportUserComponent', () => {
  let component: StaticDynamicImportUserComponent;
  let fixture: ComponentFixture<StaticDynamicImportUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaticDynamicImportUserComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StaticDynamicImportUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
