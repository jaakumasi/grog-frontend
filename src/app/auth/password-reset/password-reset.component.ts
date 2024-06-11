import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageBoxComponent } from '../../_shared/components/message-box/message-box.component';
import { FormControlComponent } from '../../_shared/components/form-control/form-control.component';
import { InvalidInputMessageComponent } from '../_shared/components/invalid-input-message/invalid-input-message.component';
import { passwordMatch } from '../_shared/validators/password-match.validator';
import { ActionBtnComponent } from '../_shared/components/action-btn/action-btn.component';
import {
  ENDPOINTS,
  REDIRECTION_TIMEOUT,
  STORAGE_KEYS,
} from '../../_shared/constants';
import { ApiService } from '../_shared/services/api.service';
import { PasswordReset } from '../_shared/types/requests.interfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseObject } from '../../_shared/types';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageComponent } from '../../_shared/components/message/message.component';

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [
    ActionBtnComponent,
    CommonModule,
    FormControlComponent,
    InvalidInputMessageComponent,
    MessageComponent,
    MessageBoxComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './password-reset.component.html',
})
export class PasswordResetComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  apiService = inject(ApiService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  message = signal('Set a new password');
  showMessage = signal(false);

  passwordResetForm!: FormGroup;
  isSubmitEnabled = signal(false);
  isMakingRequest = signal(false);
  showHttpErrorResponse = signal(false);
  showSuccessfulPasswordResetNotif = signal(false);
  httpErrorMessage = signal('');

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((qparams) => {
      const message = qparams.get('message');
      if (message) {
        this.message.set(message);
        this.showMessage.set(true);
      }
    });

    this.passwordResetForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    });
    this.passwordResetForm.addValidators(passwordMatch);
    this.passwordResetForm.valueChanges.subscribe(() =>
      this.isSubmitEnabled.set(this.passwordResetForm.valid)
    );
  }

  onApply() {
    this.onRequestStart();

    const requestBody = {
      email: this.getEmail(),
      password: this.passwordResetForm.get('password')?.value,
    } as PasswordReset;

    this.apiService.handlePasswordRest(requestBody).subscribe({
      next: (response: any) => this.handleSuccessResponse(response),
      error: (response: HttpErrorResponse) =>
        this.handleErrorResponse(response),
    });
  }

  handleSuccessResponse(response: ResponseObject) {
    this.onRequestEnd();
    this.showSuccessfulPasswordResetNotif.set(true);

    setTimeout(async () => {
      await this.router.navigateByUrl(ENDPOINTS.SIGNIN);
    }, REDIRECTION_TIMEOUT);
  }

  onRequestStart() {
    this.isMakingRequest.set(true);
    this.isSubmitEnabled.set(false);
    this.showHttpErrorResponse.set(false);
  }

  onRequestEnd() {
    this.isMakingRequest.set(false);
  }

  handleErrorResponse(response: HttpErrorResponse) {
    this.onRequestEnd();
    this.httpErrorMessage.set(response.error.message);
    this.showHttpErrorResponse.set(true);
  }

  getEmail() {
    return globalThis.window.localStorage.getItem(STORAGE_KEYS.EMAIL);
  }

  get passwordRequired() {
    return (
      this.passwordResetForm.get('password')?.touched &&
      this.passwordResetForm.get('password')?.hasError('required')
    );
  }

  get passwordTooShort() {
    return (
      this.passwordResetForm.get('password')?.touched &&
      this.passwordResetForm.get('password')?.hasError('minlength')
    );
  }

  get confirmPasswordRequired() {
    return (
      this.passwordResetForm.get('confirmPassword')?.touched &&
      this.passwordResetForm.get('confirmPassword')?.hasError('required')
    );
  }

  get passwordMismatch() {
    console.log(this.passwordResetForm.hasError('passwordMismatch'));
    return (
      this.passwordResetForm.get('confirmPassword')?.touched &&
      this.passwordResetForm.hasError('passwordMismatch')
    );
  }
}
