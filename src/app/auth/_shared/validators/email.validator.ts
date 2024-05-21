import { AbstractControl, ValidationErrors } from '@angular/forms';

export const emailValidator: ValidationErrors | null = (
  control: AbstractControl
) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (control.value && !emailRegex.test(control.value)) return { email: true };
  else return null;
};
