import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageBoxComponent } from '../../_shared/components/message-box/message-box.component';
import { MessageComponent } from '../../_shared/components/message/message.component';
import { STORAGE_KEYS, VERIFICATION_SCENARIO } from '../../_shared/constants';
import { ApiService } from '../_shared/services/api.service';
import { ResponseObject } from '../../_shared/types';

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
  route = inject(ActivatedRoute);

  message = signal('Please enter the OTP sent to your email');
  allowResend = signal(false);
  isVerifying = signal(false);
  isVerificationComplete = signal(false);
  showErrorResponse = signal(false);
  isOtpInvalid = signal(false);
  errorResponse = signal('');
  requestOtpWaitTime = signal(60);
  formattedWaitTime = signal('00:00');
  intervalRef!: any;

  otpInput1 = '';
  otpInput2 = '';
  otpInput3 = '';
  otpInput4 = '';
  inputRegex = /\d/;

  ngOnInit(): void {
    /* set the otp verification screen message to the parsed query param
     * if its exists. */
    this.route.queryParamMap.subscribe((qparams) => {
      const qparamMsg = qparams.get('message');
      if (qparamMsg) this.message.set(qparamMsg);
    });
    /* start the resend coundown */
    this.countdownTimer();
  }

  onOtpChange(value: string, ref: HTMLInputElement | null) {
    /* ignore otp input changes if OTP verification is ongoing */
    if (this.isVerifying()) return;
    /* process to submit if all fields are filled with numbers */
    if (
      this.inputRegex.test(this.otpInput1) &&
      this.inputRegex.test(this.otpInput2) &&
      this.inputRegex.test(this.otpInput3) &&
      this.inputRegex.test(this.otpInput4)
    ) {
      this.onSubmit();
      return;
    }
    /* move focus to next otp field if the current input is a number */
    const matches = this.inputRegex.test(value);
    if (matches && ref) ref.focus();
  }

  onSubmit() {
    this.onRequestStart();

    const otp =
      this.otpInput1 + this.otpInput2 + this.otpInput3 + this.otpInput4;
    const requestBody = {
      otp,
      email: this.getEmail(),
      verificationScenario: this.getVerificationScenario(),
    };
    this.apiService.handleOtpVerification(requestBody).subscribe({
      next: (response: any) => this.handleSuccessResponse(response),
      error: (response: HttpErrorResponse) =>
        this.handleErrorResponse(response),
    });
  }

  handleSuccessResponse(response: ResponseObject) {
    this.onRequestEnd();
    clearInterval(this.intervalRef);
    this.allowResend.set(false);
    this.isVerificationComplete.set(true);

    const redirectTo = response.data?.redirectTo!;
    setTimeout(async () => {
      await this.router.navigateByUrl(redirectTo);
    }, 2000);
  }

  handleErrorResponse(response: HttpErrorResponse) {
    this.onRequestEnd();
    this.isOtpInvalid.set(true);
    this.errorResponse.set(response.error.message);
    this.showErrorResponse.set(true);
  }

  getEmail() {
    return globalThis.window?.localStorage.getItem(STORAGE_KEYS.EMAIL);
  }

  /**
   * OTP verification is done during signup (using form or social signin provider)
   * or password reset.
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
