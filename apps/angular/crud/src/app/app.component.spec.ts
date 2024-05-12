import { MockBuilder, MockRender } from 'ng-mocks';
import { AppComponent } from './app.component';
describe('AppComponent', () => {
  beforeEach(() => MockBuilder(AppComponent));

  it('should be created', () => {
    const fixture = MockRender(AppComponent);
    const component = fixture.point.componentInstance;
    expect(component).toBeTruthy();
  });
});
