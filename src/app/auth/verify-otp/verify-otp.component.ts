import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageBoxComponent } from '../../_shared/components/message-box/message-box.component';
import { MessageComponent } from '../../_shared/components/message/message.component';
import { STORAGE_KEYS, VERIFICATION_SCENARIO } from '../../_shared/constants';
import { ApiService } from '../_shared/services/api.service';

@Component({
  selector: 'app-verify-otp',
  standalone: true,
  imports: [
    CommonModule,
    MessageComponent,
    FormsModule,
    HttpClientModule,
    MessageBoxComponent,
  ],
  templateUrl: './verify-otp.component.html',
})
export class VerifyOtpComponent implements OnInit {
  apiService = inject(ApiService);
  router = inject(Router);

  allowResend = signal(false);
  isVerifying = signal(false);
  isVerificationComplete = signal(false);
  showErrorResponse = signal(false);
  errorResponse = signal('');
  requestOtpWaitTime = signal(10);
  formattedWaitTime = signal('00:00');
  intervalRef!: any;

  otpInput1 = '';
  otpInput2 = '';
  otpInput3 = '';
  otpInput4 = '';
  inputRegex = /\d/;

  ngOnInit(): void {
    this.countdownTimer();
  }

  onOtpChange(value: string, ref: HTMLInputElement | null) {
    if (this.isVerifying()) return;
    if (
      this.inputRegex.test(this.otpInput1) &&
      this.inputRegex.test(this.otpInput2) &&
      this.inputRegex.test(this.otpInput3) &&
      this.inputRegex.test(this.otpInput4)
    ) {
      this.onSubmit();
      return;
    }
    const matches = this.inputRegex.test(value);
    if (matches && ref) ref.focus();
  }

  onSubmit() {
    this.onRequestStart();
    setTimeout(() => {
      const otp =
        this.otpInput1 + this.otpInput2 + this.otpInput3 + this.otpInput4;
      const requestBody = {
        otp,
        email: this.getEmail(),
        verificationScenario: this.getVerificationScenario(),
      };
      this.apiService.handleOtpVerification(requestBody).subscribe({
        next: (response: any) => {
          console.log(response);
          this.onRequestEnd();
        },
        error: (response: HttpErrorResponse) => {
          console.log(response);
          this.onRequestEnd();
          this.errorResponse.set(response.error.message);
          this.showErrorResponse.set(true);
        },
      });
    }, 2000);
  }

  getEmail() {
    return localStorage.getItem(STORAGE_KEYS.EMAIL);
  }

  /**
   * OTP verification is done during signup (using form or social signin provider) or password reset.
   */
  getVerificationScenario() {
    const url = this.router.url;
    return url.endsWith(VERIFICATION_SCENARIO.PASSWORD_RESET)
      ? VERIFICATION_SCENARIO.PASSWORD_RESET
      : url.endsWith(VERIFICATION_SCENARIO.FORM_SIGNUP)
      ? VERIFICATION_SCENARIO.FORM_SIGNUP
      : VERIFICATION_SCENARIO.SOCIAL_SIGNUP;
  }

  onRequestStart() {
    this.isVerifying.set(true);
  }

  onRequestEnd() {
    this.isVerifying.set(false);
  }

  onResendOtp() {
    this.allowResend.set(false);
    const requestBody = {
      email: this.getEmail()!,
    };
    this.apiService.handleOtpRequest(requestBody).subscribe({
      next: (response: any) => {
        console.log(response);
        this.requestOtpWaitTime.set(60);
        this.countdownTimer();
      },
      // error: (response: HttpErrorResponse) => {
      //   console.log(response);
      // },
    });
  }

  countdownTimer() {
    this.intervalRef = setInterval(() => {
      if (this.requestOtpWaitTime() == 0) {
        clearInterval(this.intervalRef);
        this.allowResend.set(true);
        return;
      }
      this.requestOtpWaitTime.update((currTime) => currTime - 1);
      const mins = Math.floor(this.requestOtpWaitTime() / 60);
      const secs = this.requestOtpWaitTime() % 60;
      const minString = mins.toString().padStart(2, '0');
      const secString = secs.toString().padStart(2, '0');
      this.formattedWaitTime.set(`${minString}:${secString}`);
    }, 1000);
  }
}
