import { TestBed } from '@angular/core/testing';
import { ItemComponent } from './item.component';

describe('ItemComponent', () => {
  let component: ItemComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [ItemComponent],
    });
    component = TestBed.createComponent(ItemComponent).componentInstance;
  });

  it('should render the component', () => {
    expect(component).toBeTruthy();
  });
});
