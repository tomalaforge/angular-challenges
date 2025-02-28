import { Component, input } from '@angular/core';

@Component({
  selector: 'app-subscription',
  template: `
    <div>TestId: {{ testId() }}</div>
    <div>Permission: {{ permission() }}</div>
    <div>User: {{ user() }}</div>
  `,
})
export default class TestComponent {
  public readonly testId = input<number | undefined>(undefined);
  public readonly permission = input<string | undefined>(undefined);
  public readonly user = input<string | undefined>(undefined);
}
