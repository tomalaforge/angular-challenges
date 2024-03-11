import { Component, Input as RouterInput } from '@angular/core';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [],
  template: `
    <div>TestId: {{ id }}</div>
    <div>Permission: {{ permission }}</div>
    <div>User: {{ user }}</div>
  `,
})
export default class TestComponent {
  @RouterInput('testId') id!: string;
  @RouterInput() user!: string;
  @RouterInput() permission!: string;
}
