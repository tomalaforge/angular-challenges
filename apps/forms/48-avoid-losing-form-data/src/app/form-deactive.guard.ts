export interface FormDeactivateCheck {
  hasUnsavedChanges: () => boolean;
}

export function FormDeactivateGuard(component: FormDeactivateCheck) {
  if (component.hasUnsavedChanges()) {
    return window.confirm(
      'There are unsaved changes! Are you sure you want to leave?',
    );
  }

  return true;
}
