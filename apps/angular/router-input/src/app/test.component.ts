import { Component, Input as RouterInput } from '@angular/core';

@Component({
  selector: 'app-subscription',
  standalone: true,
  template: `
    <div>TestId: {{ this.testId }}</div>
    <div>Permission: {{ this.permission }}</div>
    <div>User: {{ this.user }}</div>
  `,
})
export default class TestComponent {
  @RouterInput() testId!: string;
  @RouterInput() permission!: string;
  @RouterInput() user!: string;
}
