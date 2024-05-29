import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MessageBoxComponent } from '../../_shared/components/message-box/message-box.component';
import { ENDPOINTS, REDIRECTION_TIMEOUT, STORAGE_KEYS } from '../../_shared/constants';
import { ActionBtnComponent } from '../_shared/components/action-btn/action-btn.component';
import { FormControlComponent } from '../_shared/components/form-control/form-control.component';
import { InvalidInputMessageComponent } from '../_shared/components/invalid-input-message/invalid-input-message.component';
import { ApiService } from '../_shared/services/api.service';
import { emailValidator } from '../_shared/validators/email.validator';
import { passwordMatch } from '../_shared/validators/password-match.validator';
import { ResponseObject } from '../../_shared/types';
import { MessageComponent } from '../../_shared/components/message/message.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ActionBtnComponent,
    FormControlComponent,
    HttpClientModule,
    InvalidInputMessageComponent,
    MessageComponent,
    MessageBoxComponent,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  apiService = inject(ApiService);
  router = inject(Router);
  signupForm!: FormGroup;
  isSubmitEnabled = signal(false);
  showHttpErrorResponse = signal(false);
  httpErrorMessage = signal('');
  isMakingRequest = signal(false);
  isSignupSuccessful = signal(false);

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, emailValidator]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    });
    this.signupForm.addValidators(passwordMatch);
    this.signupForm?.valueChanges.subscribe(() =>
      this.isSubmitEnabled.set(this.signupForm.valid)
    );
  }

  onSignup() {
    this.onRequestStart();

    const formValue = this.signupForm.value;
    const requestBody = {
      email: formValue.email,
      password: formValue.password,
      isSocialLogin: false,
    };
    this.apiService.handleSignup(requestBody).subscribe({
      next: (response: any) => this.handleSuccessResponse(response),
      error: (response: HttpErrorResponse) =>
        this.handleErrorResponse(response),
    });
  }

  handleSuccessResponse(response: ResponseObject) {
    this.isSubmitEnabled.set(false);
    this.saveEmail();
    this.isSignupSuccessful.set(true);
    this.isMakingRequest.set(true); // done to hide the redirect link to the signin page

    const redirectTo = response.data?.redirectTo;
    const scenario = response.data?.scenario;

    setTimeout(async () => {
      await this.router.navigate([redirectTo, scenario]);
    }, REDIRECTION_TIMEOUT);
  }

  handleErrorResponse(response: HttpErrorResponse) {
    console.log(response);
    this.onRequestEnd();
    this.showHttpErrorResponse.set(true);
    this.httpErrorMessage.set(response.error.message);
  }

  saveEmail() {
    globalThis.window?.localStorage.setItem(STORAGE_KEYS.EMAIL, this.signupForm.value.email);
  }

  onRequestStart() {
    this.isMakingRequest.set(true);
    this.showHttpErrorResponse.set(false);
    this.isSubmitEnabled.set(false);
  }

  onRequestEnd() {
    this.isMakingRequest.set(false);
    this.isSubmitEnabled.set(true);
  }

  get emailRequired() {
    return (
      this.signupForm.get('email')?.touched &&
      this.signupForm.get('email')?.hasError('required')
    );
  }

  get emailPatternInvalid() {
    return (
      this.signupForm.get('email')?.touched &&
      this.signupForm.get('email')?.hasError('email')
    );
  }

  get passwordRequired() {
    return (
      this.signupForm.get('password')?.touched &&
      this.signupForm.get('password')?.hasError('required')
    );
  }

  get passwordTooShort() {
    return (
      this.signupForm.get('password')?.touched &&
      this.signupForm.get('password')?.hasError('minlength')
    );
  }

  get confirmPasswordRequired() {
    return (
      this.signupForm.get('confirmPassword')?.touched &&
      this.signupForm.get('confirmPassword')?.hasError('required')
    );
  }

  get passwordMismatch() {
    return (
      this.signupForm.get('confirmPassword')?.touched &&
      this.signupForm.hasError('passwordMismatch')
    );
  }
}
