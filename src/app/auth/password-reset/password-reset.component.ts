import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageBoxComponent } from '../../_shared/components/message-box/message-box.component';
import { FormControlComponent } from '../_shared/components/form-control/form-control.component';
import { InvalidInputMessageComponent } from '../_shared/components/invalid-input-message/invalid-input-message.component';
import { passwordMatch } from '../_shared/validators/password-match.validator';

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [
    CommonModule,
    FormControlComponent,
    InvalidInputMessageComponent,
    MessageBoxComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './password-reset.component.html',
})
export class PasswordResetComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  passwordResetForm!: FormGroup;
  isFormValid = false;

  ngOnInit(): void {
    this.passwordResetForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    });

    this.passwordResetForm.addValidators(passwordMatch);

    this.passwordResetForm.valueChanges.subscribe(
      (val) => (this.isFormValid = this.passwordResetForm.valid)
    );
  }

  get passwordRequired() {
    return (
      this.passwordResetForm.get('newPassword')?.touched &&
      this.passwordResetForm.get('newPassword')?.hasError('required')
    );
  }

  get passwordTooShort() {
    return (
      this.passwordResetForm.get('newPassword')?.touched &&
      this.passwordResetForm.get('newPassword')?.hasError('minlength')
    );
  }

  get confirmPasswordRequired() {
    return (
      this.passwordResetForm.get('confirmPassword')?.touched &&
      this.passwordResetForm.get('confirmPassword')?.hasError('required')
    );
  }

  get passwordMismatch() {
    return (
      this.passwordResetForm.get('confirmPassword')?.touched &&
      this.passwordResetForm.hasError('passwordMismatch')
    );
  }
}
