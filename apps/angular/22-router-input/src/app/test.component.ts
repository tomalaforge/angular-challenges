import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="info-container">
      <div class="info-item">
        <span class="label">TestId:</span>
        <span class="value">{{ testId }}</span>
      </div>
      <div class="info-item">
        <span class="label">Permission:</span>
        <span class="value">{{ permission }}</span>
      </div>
      <div class="info-item">
        <span class="label">User:</span>
        <span class="value">{{ user }}</span>
      </div>
    </div>
  `,
  styles: [
    `
      .info-container {
        margin-top: 2rem;
        padding: 1.5rem;
        background: white;
        border-radius: 6px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }
      .info-item {
        display: flex;
        align-items: center;
        padding: 0.75rem 0;
        border-bottom: 1px solid #e9ecef;
      }
      .info-item:last-child {
        border-bottom: none;
      }
      .label {
        font-weight: 600;
        color: #495057;
        width: 120px;
      }
      .value {
        color: #212529;
      }
    `,
  ],
})
export default class TestComponent implements OnInit {
  testId: string = '';
  permission: string = '';
  user: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Get route parameters
    this.route.params.subscribe((params) => {
      this.testId = params['testId'];
    });

    // Get query parameters
    this.route.queryParams.subscribe((queryParams) => {
      this.user = queryParams['user'];
    });

    // Get resolved data
    this.route.data.subscribe((data) => {
      this.permission = data['permission'];
    });
  }
}
