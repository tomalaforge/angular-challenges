import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ItemComponent } from './item.component';
import { TodoConfig } from '../core/Interface/todo';
import { BrowserModule, By } from '@angular/platform-browser';
import { GetToDoService } from '../services/getTodo.service';
import { HttpClientModule } from '@angular/common/http';

const mockData: TodoConfig = {
  userId: 1,
  id: 1,
  title: 'delectus aut autem',
  completed: false,
};

describe('ItemComponent - ', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemComponent, BrowserModule, HttpClientModule],
      providers: [GetToDoService],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component input and out testing', () => {
    it('should set config and spinner state ', () => {
      component.config = mockData;
      fixture.detectChanges();
      expect(component.todo).toEqual(mockData);
      component.isShowSpinner.subscribe((data) => {
        expect(data).toEqual(true);
      });
    });

    it('should emit update output event on click', () => {
      component.config = mockData;
      const spy = jest.spyOn(component.updateTodo, 'emit');
      const updateEl = fixture.debugElement.query(By.css('.update'));
      updateEl.triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(spy).toHaveBeenCalledWith(mockData);
    });

    it('should emit delete output event on click', () => {
      component.config = mockData;
      const spy = jest.spyOn(component.deleteTodo, 'emit');
      const deleteEl = fixture.debugElement.query(By.css('.delete'));
      deleteEl.triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(spy).toHaveBeenCalledWith(1);
    });
  });
});
