import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'cha-getting-started',
  template: `
    <div class="bg-white text-gray-800">
      <!-- Header / Hero -->
      <section
        class="bg-gradient-to-r from-red-600 to-orange-500 py-20 text-center text-white">
        <div class="container mx-auto px-4">
          <h1 class="mb-4 text-4xl font-bold md:text-5xl">Getting Started</h1>
          <p class="mx-auto max-w-2xl text-lg md:text-xl">
            Welcome to Angular Challenges! Learn how to set up and solve your
            first challenge.
          </p>
        </div>
      </section>

      <!-- Intro Section -->
      <section class="py-16">
        <div class="container mx-auto max-w-3xl px-4">
          <h2 class="mb-4 text-2xl font-bold">What are Angular Challenges?</h2>
          <p class="mb-6">
            Angular Challenges are bite-sized practical problems designed to
            help you practice real-world Angular concepts. Each challenge is
            independent and focuses on a specific topic, like components, pipes,
            services, forms, and more.
          </p>

          <h2 class="mb-4 text-2xl font-bold">How It Works</h2>
          <ol class="list-inside list-decimal space-y-4">
            <li>
              <strong>Pick a Challenge:</strong>
              Browse challenges by category and difficulty. Choose one that
              matches your current learning goal.
            </li>
            <li>
              <strong>Read the Instructions:</strong>
              Each challenge comes with clear requirements and context. Read
              carefully before coding.
            </li>
            <li>
              <strong>Code in the Online Editor:</strong>
              Solve the challenge directly in your browser. Our platform runs
              Angular code with instant feedback.
            </li>
            <li>
              <strong>Check Your Solution:</strong>
              Validate your solution against provided tests. If it passes,
              you’re ready to move on!
            </li>
            <li>
              <strong>Review Official Solutions:</strong>
              Compare your approach with the official solution to learn best
              practices and different patterns.
            </li>
          </ol>
        </div>
      </section>

      <!-- Example Challenge Preview -->
      <section class="bg-gray-50 py-16">
        <div class="container mx-auto max-w-4xl px-4">
          <h2 class="mb-6 text-center text-2xl font-bold">
            Try Your First Challenge
          </h2>
          <div class="mb-6 rounded-lg bg-white p-6 shadow">
            <h3 class="mb-2 text-xl font-semibold">
              Challenge: Create a Custom Pipe
            </h3>
            <p class="mb-4 text-gray-600">
              Build a pipe that capitalizes the first letter of each word in a
              string.
            </p>
            <a
              routerLink="/challenges/custom-pipe"
              class="inline-block rounded bg-red-600 px-6 py-3 text-white transition hover:bg-red-700">
              Start This Challenge
            </a>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section
        class="bg-gradient-to-r from-red-600 to-orange-500 py-16 text-center text-white">
        <h2 class="mb-4 text-3xl font-bold md:text-4xl">
          Ready to solve your first Angular Challenge?
        </h2>
        <a
          routerLink="/challenges"
          class="rounded-lg bg-white px-8 py-4 font-semibold text-red-600 transition hover:bg-gray-100">
          Browse All Challenges
        </a>
      </section>
    </div>
  `,
  imports: [RouterLink],
})
export class GettingStarted {}
