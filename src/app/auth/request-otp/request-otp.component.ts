import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { MessageBoxComponent } from '../../_shared/components/message-box/message-box.component';
import { REDUCERS } from '../../_shared/constants';
import { FormControlComponent } from '../_shared/components/form-control/form-control.component';
import { GrogHeaderComponent } from '../_shared/components/grog-header/grog-header.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { emailValidator } from '../_shared/validators/email.validator';
import { ActionBtnComponent } from '../_shared/components/action-btn/action-btn.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-request-otp',
  standalone: true,
  imports: [
    ActionBtnComponent,
    CommonModule,
    FormControlComponent,
    GrogHeaderComponent,
    MessageBoxComponent,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './request-otp.component.html',
  styleUrl: './request-otp.component.scss',
})
export class RequestOtpComponent implements OnInit {
  state$ = inject(Store).select(REDUCERS.GLOBAL_STATE_REDUCER);
  isSmall = false;
  formBuiilder = inject(FormBuilder);
  requestOtpForm!: FormGroup;

  ngOnInit(): void {
    this.state$.subscribe((screenSize) => {
      const screen = screenSize.screenSize;
      this.isSmall = screen == 'small' || screen === 'xsmall';
    });

    this.requestOtpForm = this.formBuiilder.group({
      email: ['', [Validators.required, emailValidator]],
    });
  }

  get emailRequired() {
    return (
      this.requestOtpForm.get('email')?.touched &&
      this.requestOtpForm.get('email')?.hasError('email')
    );
  }
}
