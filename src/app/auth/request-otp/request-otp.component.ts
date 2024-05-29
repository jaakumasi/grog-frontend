import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MessageBoxComponent } from '../../_shared/components/message-box/message-box.component';
import { MessageComponent } from '../../_shared/components/message/message.component';
import { ENDPOINTS, STORAGE_KEYS } from '../../_shared/constants';
import { ResponseObject, VerificationScenario } from '../../_shared/types';
import { ActionBtnComponent } from '../_shared/components/action-btn/action-btn.component';
import { FormControlComponent } from '../_shared/components/form-control/form-control.component';
import { InvalidInputMessageComponent } from '../_shared/components/invalid-input-message/invalid-input-message.component';
import { ApiService } from '../_shared/services/api.service';
import { emailValidator } from '../_shared/validators/email.validator';

@Component({
  selector: 'app-request-otp',
  standalone: true,
  imports: [
    ActionBtnComponent,
    CommonModule,
    MessageComponent,
    FormControlComponent,
    InvalidInputMessageComponent,
    MessageBoxComponent,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './request-otp.component.html',
})
export class RequestOtpComponent implements OnInit {
  formBuiilder = inject(FormBuilder);
  apiService = inject(ApiService);
  router = inject(Router);

  requestOtpForm!: FormGroup;
  signinPage = signal(ENDPOINTS.SIGNIN);
  isFormValid = signal(false);
  isMakingRequest = signal(false);
  showNonExistingUserError = signal(false);
  httpErrorResponse = signal('');

  ngOnInit(): void {
    this.requestOtpForm = this.formBuiilder.group({
      email: ['', [Validators.required, emailValidator]],
    });

    this.requestOtpForm.valueChanges.subscribe(() => {
      this.isFormValid.set(this.requestOtpForm.valid);
      this.showNonExistingUserError.set(false);
    });
  }

  onSubmit() {
    this.onRequestStart();

    const requestBody = {
      email: this.requestOtpForm.get('email')?.value,
    };

    this.apiService.handleOtpRequest(requestBody).subscribe({
      next: () => this.handleSuccessResponse(),
      error: (response: HttpErrorResponse) =>
        this.handleErrorResponse(response),
    });
  }

  async handleSuccessResponse() {
    this.onRequestEnd();
    this.saveEmail();

    await this.router.navigate([
      ENDPOINTS.OTP_VERIFICATION,
      VerificationScenario.passwordReset,
    ]);
  }

  handleErrorResponse(response: HttpErrorResponse) {
    this.onRequestEnd();
    const errorMessage = response.error.message;
    this.httpErrorResponse.set(errorMessage);
    this.showNonExistingUserError.set(true);
  }

  saveEmail() {
    globalThis.window?.localStorage.setItem(
      STORAGE_KEYS.EMAIL,
      this.requestOtpForm.value.email
    );
  }

  onRequestStart() {
    this.isMakingRequest.set(true);
  }

  onRequestEnd() {
    this.isMakingRequest.set(false);
  }

  get emailRequired() {
    return (
      this.requestOtpForm.get('email')?.touched &&
      this.requestOtpForm.get('email')?.hasError('required')
    );
  }

  get emailPatternInvalid() {
    return (
      this.requestOtpForm.get('email')?.touched &&
      this.requestOtpForm.get('email')?.hasError('email')
    );
  }
}
