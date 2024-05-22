import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ErrorMessageComponent } from '../../_shared/components/error-message/error-message.component';
import { MessageBoxComponent } from '../../_shared/components/message-box/message-box.component';
import { ActionBtnComponent } from '../_shared/components/action-btn/action-btn.component';

@Component({
  selector: 'app-verify-otp',
  standalone: true,
  imports: [
    ActionBtnComponent,
    CommonModule,
    ErrorMessageComponent,
    FormsModule,
    MessageBoxComponent,
  ],
  templateUrl: './verify-otp.component.html',
})
export class VerifyOtpComponent implements OnInit {
  showInvalidOtpMessage = false;
  waitTime = 60;
  formattedWaitTime = '00:00';
  intervalRef!: any;
  allowResend = false;

  otpInput1 = '';
  otpInput2 = '';
  otpInput3 = '';
  otpInput4 = '';
  inputRegex = /\d/;

  ngOnInit(): void {
    this.timer();
  }

  onOtpChange(value: string, ref: HTMLInputElement | null) {
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
    const otpCode = parseInt(
      this.otpInput1 + this.otpInput2 + this.otpInput3 + this.otpInput4
    );
    // logic here
  }

  onResendOtp() {
    // handle logic
  }

  timer() {
    const savedTime = localStorage.getItem('timer-value');
    if(savedTime) this.waitTime = Number(savedTime);
    this.intervalRef = setInterval(() => {
      if (this.waitTime == 0) {
        clearInterval(this.intervalRef);
        localStorage.removeItem('timer-value');
        this.allowResend = true;
        return;
      }
      this.waitTime -= 1;
      localStorage.setItem('timer-value', this.waitTime.toString());
      const mins = Math.floor(this.waitTime / 60);
      const secs = this.waitTime % 60;
      const minString = mins.toString().padStart(2, '0');
      const secString = secs.toString().padStart(2, '0');
      this.formattedWaitTime = `${minString}:${secString}`;
      console.log(this.formattedWaitTime);
    }, 1000);
  }
}
