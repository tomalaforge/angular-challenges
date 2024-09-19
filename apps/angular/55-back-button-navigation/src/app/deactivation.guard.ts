export interface DeactivationCheck {
  canDeactivate: () => boolean;
}

export function deactivationGuard(component: DeactivationCheck) {
  return component.canDeactivate?.() ?? true;
}
