import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="home-container">
      <header class="hero">
        <h1>Welcome to Test Portal</h1>
        <p class="subtitle">Manage and track your test subscriptions</p>
      </header>

      <section class="features">
        <h2>Quick Actions</h2>
        <div class="cards-grid">
          <div class="card">
            <div class="card-icon">📊</div>
            <h3>View Tests</h3>
            <p>Access and manage your existing test subscriptions</p>
            <button
              class="action-button"
              [routerLink]="['/subscription', '1']"
              [queryParams]="{ user: 'demo' }">
              View Tests
            </button>
          </div>
          <div class="card">
            <div class="card-icon">🔍</div>
            <h3>Track Progress</h3>
            <p>Monitor your test completion and results</p>
            <button
              class="action-button"
              [routerLink]="['/subscription', '2']"
              [queryParams]="{ user: 'demo' }">
              Check Progress
            </button>
          </div>
          <div class="card">
            <div class="card-icon">📅</div>
            <h3>Schedule Tests</h3>
            <p>Plan and organize upcoming test sessions</p>
            <button
              class="action-button"
              [routerLink]="['/subscription', '3']"
              [queryParams]="{ user: 'demo' }">
              Schedule Now
            </button>
          </div>
        </div>
      </section>

      <section class="get-started">
        <h2>Getting Started</h2>
        <div class="steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>Create Account</h3>
              <p>Set up your user profile to begin</p>
            </div>
          </div>
          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>Select Test</h3>
              <p>Choose from available test options</p>
            </div>
          </div>
          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>Start Testing</h3>
              <p>Begin your assessment journey</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [
    `
      .home-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
      }

      .hero {
        text-align: center;
        padding: 3rem 0;
        background: linear-gradient(to right, #f8f9fa, #e9ecef);
        border-radius: 12px;
        margin-bottom: 3rem;
      }

      .hero h1 {
        font-size: 2.5rem;
        color: #212529;
        margin-bottom: 1rem;
      }

      .subtitle {
        font-size: 1.25rem;
        color: #6c757d;
      }

      .features {
        margin-bottom: 3rem;
      }

      h2 {
        font-size: 1.75rem;
        color: #343a40;
        margin-bottom: 1.5rem;
      }

      .cards-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
        margin-bottom: 2rem;
      }

      .card {
        background: white;
        padding: 1.5rem;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s;
        display: flex;
        flex-direction: column;
      }

      .card:hover {
        transform: translateY(-5px);
      }

      .card-icon {
        font-size: 2rem;
        margin-bottom: 1rem;
      }

      .card h3 {
        font-size: 1.25rem;
        color: #343a40;
        margin-bottom: 0.5rem;
      }

      .card p {
        color: #6c757d;
        line-height: 1.5;
        margin-bottom: 1rem;
        flex-grow: 1;
      }

      .action-button {
        background: #0d6efd;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 500;
        transition: background-color 0.2s;
      }

      .action-button:hover {
        background: #0b5ed7;
      }

      .steps {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
      }

      .step {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .step-number {
        width: 40px;
        height: 40px;
        background: #0d6efd;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1.25rem;
      }

      .step-content h3 {
        font-size: 1.1rem;
        color: #343a40;
        margin-bottom: 0.25rem;
      }

      .step-content p {
        color: #6c757d;
        font-size: 0.9rem;
      }

      @media (max-width: 768px) {
        .home-container {
          padding: 1rem;
        }

        .hero {
          padding: 2rem 1rem;
        }

        .hero h1 {
          font-size: 2rem;
        }

        .cards-grid,
        .steps {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export default class HomeComponent {}
