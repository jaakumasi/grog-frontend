import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MessageBoxComponent } from '../../_shared/components/message-box/message-box.component';
import { MessageComponent } from '../../_shared/components/message/message.component';
import { ActionBtnComponent } from '../_shared/components/action-btn/action-btn.component';
import { FormControlComponent } from '../_shared/components/form-control/form-control.component';
import { InvalidInputMessageComponent } from '../_shared/components/invalid-input-message/invalid-input-message.component';
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
    RouterModule,
  ],
  templateUrl: './request-otp.component.html',
})
export class RequestOtpComponent implements OnInit {
  formBuiilder = inject(FormBuilder);
  requestOtpForm!: FormGroup;
  isFormValid = false;
  showNonExistingUserError = false;

  ngOnInit(): void {
    this.requestOtpForm = this.formBuiilder.group({
      email: ['', [Validators.required, emailValidator]],
    });

    this.requestOtpForm.valueChanges.subscribe(
      () => (this.isFormValid = this.requestOtpForm.valid)
    );
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
