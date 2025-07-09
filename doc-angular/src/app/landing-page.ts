import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'cha-landing-page',
  template: `
    <div class="bg-gray-50 text-gray-900">
      <!-- Hero Section -->
      <section
        class="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-red-600 to-orange-500 px-4 text-center text-white">
        <!-- Decorative background shapes -->
        <div
          class="pointer-events-none absolute inset-0 bg-gradient-to-r from-red-700 to-orange-600 opacity-20 blur-3xl"></div>

        <h1
          class="mb-6 transform text-4xl font-extrabold transition duration-700 hover:scale-105 md:text-6xl">
          Master Angular One Challenge at a Time
        </h1>
        <p class="mb-8 max-w-xl text-lg md:text-xl">
          Practice real-world Angular problems. Enhance your skills. Get
          job-ready.
        </p>
        <div
          class="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <a
            routerLink="/challenges"
            class="rounded-lg bg-white px-8 py-4 font-semibold text-red-600 transition hover:bg-gray-100">
            Start Solving Challenges
          </a>
          <a
            routerLink="/challenges"
            class="rounded-lg border border-white px-8 py-4 font-semibold transition hover:bg-white hover:text-red-600">
            Browse Challenges
          </a>
        </div>
      </section>

      <!-- Features Section -->
      <section class="py-20">
        <div class="container mx-auto px-4 text-center">
          <h2 class="mb-12 text-3xl font-bold md:text-4xl">
            Why Angular Challenges?
          </h2>
          <div class="grid gap-8 md:grid-cols-3">
            <!-- Feature 1 -->
            <div
              class="transform rounded-lg bg-white p-8 shadow transition duration-500 hover:-translate-y-2">
              <svg
                class="mx-auto mb-4 h-12 w-12 text-red-600"
                fill="currentColor"
                viewBox="0 0 20 20">
                <path
                  d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 12l-3-3 1.414-1.414L9 9.172l4.586-4.586L15 6l-6 6z" />
              </svg>
              <h3 class="mb-2 text-xl font-semibold">Real-world scenarios</h3>
              <p>
                Learn by solving practical Angular problems from beginner to
                expert.
              </p>
            </div>

            <!-- Feature 2 -->
            <div
              class="transform rounded-lg bg-white p-8 shadow transition duration-500 hover:-translate-y-2">
              <svg
                class="mx-auto mb-4 h-12 w-12 text-red-600"
                fill="currentColor"
                viewBox="0 0 20 20">
                <path
                  d="M2 5a2 2 0 012-2h3v2H4v10h3v2H4a2 2 0 01-2-2V5zm12-2h3a2 2 0 012 2v10a2 2 0 01-2 2h-3v-2h3V5h-3V3zm-2 0v14h-4V3h4z" />
              </svg>
              <h3 class="mb-2 text-xl font-semibold">Instant feedback</h3>
              <p>
                See results in real-time with embedded unit tests and solutions.
              </p>
            </div>

            <!-- Feature 3 -->
            <div
              class="transform rounded-lg bg-white p-8 shadow transition duration-500 hover:-translate-y-2">
              <svg
                class="mx-auto mb-4 h-12 w-12 text-red-600"
                fill="currentColor"
                viewBox="0 0 20 20">
                <path
                  d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 12H9v-2h2v2zm0-4H9V6h2v4z" />
              </svg>
              <h3 class="mb-2 text-xl font-semibold">Career growth</h3>
              <p>Ace interviews and improve your confidence in Angular.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Popular Challenges Section -->
      <section class="bg-gray-100 py-20">
        <div class="container mx-auto px-4">
          <h2 class="mb-12 text-center text-3xl font-bold md:text-4xl">
            Popular Challenges
          </h2>
          <div class="grid gap-8 md:grid-cols-3">
            <!-- Example Challenge Card -->
            <div
              class="transform rounded-lg bg-white p-6 shadow transition hover:-translate-y-2 hover:shadow-lg">
              <h3 class="mb-2 text-xl font-semibold">Build a Custom Pipe</h3>
              <p class="mb-4 text-gray-600">
                Create a pipe to transform data for your templates.
              </p>
              <span
                class="mb-4 inline-block rounded bg-green-100 px-2 py-1 text-xs text-green-800">
                Beginner
              </span>
              <a
                routerLink="/challenges/custom-pipe"
                class="block rounded bg-red-600 px-4 py-2 text-center text-white transition hover:bg-red-700">
                Solve Now
              </a>
            </div>

            <!-- Repeat dynamically with *ngFor -->
          </div>
        </div>
      </section>

      <!-- Call to Action Section -->
      <section
        class="bg-gradient-to-r from-red-600 to-orange-500 py-20 text-center text-white">
        <h2 class="mb-6 text-3xl font-bold md:text-4xl">
          Ready to become an Angular pro?
        </h2>
        <a
          routerLink="/challenges"
          class="rounded-lg bg-white px-8 py-4 font-semibold text-red-600 transition hover:bg-gray-100">
          Get Started For Free
        </a>
      </section>

      <!-- Footer -->
      <footer class="bg-gray-800 py-10 text-center text-gray-400">
        <div class="mb-4">
          <a routerLink="/" class="mx-2 hover:text-white">Home</a>
          <a routerLink="/challenges" class="mx-2 hover:text-white">
            Challenges
          </a>
          <a routerLink="/about" class="mx-2 hover:text-white">About</a>
          <a
            href="https://github.com/angular-challenges"
            target="_blank"
            class="mx-2 hover:text-white">
            GitHub
          </a>
          <a routerLink="/contact" class="mx-2 hover:text-white">Contact</a>
        </div>
        <p class="text-sm">
          © 2025 Angular Challenges. Built with ❤️ for the Angular community.
        </p>
      </footer>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
})
export class LandingPage {}
