import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { BackendService } from '../backend.service';
import { ListComponent } from './list.component';
import { AddComponent } from './ui/add.component';
import { RowComponent } from './ui/row.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent, AddComponent, RowComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [BackendService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should search on table', async () => {
    await fixture.whenStable();
    fixture.detectChanges();

    let rows = fixture.debugElement.queryAll(By.css('.rows'));
    expect(rows.length).toEqual(2);

    component.search.setValue('Install');
    fixture.detectChanges();
    await fixture.whenStable();

    rows = fixture.debugElement.queryAll(By.css('.rows'));
    expect(rows.length).toEqual(1);
  });
});
