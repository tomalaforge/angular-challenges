# Challenge 64 (Form Array) plan

## Checklist
- Inspect `apps/forms/63-child-forms` and `apps/forms/61-simplest-signal-form` for layout, styling, and test patterns to mirror.
- Confirm `apps/forms/64-form-array` project structure and existing files; align with its `project.json`, `vitest.config.ts`, and Playwright setup.
- Implement reactive form in `app.component`:
  - Root controls: `name`, `pseudo` (required).
  - `contacts` FormArray of FormGroup with `firstname`, `lastname`, `relation`, `email` (required, email validator).
  - `networkLinks` FormArray of FormGroup with `networkName`, `handle` (required).
  - Add helpers to add/remove contact/link items; initialize with one row each.
- Optional child components:
  - Create `contact-form.component` and `network-link-form.component` to render subform group controls and emit remove action; use `ControlContainer` and `FormGroup` inputs.
  - Keep all logic in `app.component` as requested, with child components limited to UI.
- Template and UX:
  - Provide clear section headings (Profile, Contacts, Network Links).
  - Disable submit until form valid; show basic validation errors on touched/dirty controls.
  - Render submitted data JSON on success.
- Tests (Vitest):
  - Verify heading, required fields presence.
  - Ensure submit disabled initially and enabled after valid input + at least one contact/link.
  - Ensure add/remove buttons update the DOM and form validity.
- Tests (Playwright):
  - Create end-to-end test that fills the form, adds a contact and a network link, submits, and asserts submitted JSON.
  - Test removal flow (remove a contact/link and verify count).
- Explanation page:
  - Add/update `README.md` or challenge page describing goal: migrate reactive form with FormArray to signal-based forms.
  - Outline expected migration steps and success criteria.
- Run tests:
  - Execute Vitest and Playwright for `64-form-array` to validate.
  - Fix any lint/test failures.

