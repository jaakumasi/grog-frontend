import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MessageBoxComponent } from '../../_shared/components/message-box/message-box.component';
import { REDUCERS } from '../../_shared/constants';
import { ActionBtnComponent } from '../_shared/components/action-btn/action-btn.component';
import { GrogHeaderComponent } from '../_shared/components/grog-header/grog-header.component';

@Component({
  selector: 'app-verify-otp',
  standalone: true,
  imports: [
    ActionBtnComponent,
    CommonModule,
    FormsModule,
    GrogHeaderComponent,
    MessageBoxComponent,
  ],
  templateUrl: './verify-otp.component.html',
  styleUrl: './verify-otp.component.scss',
})
export class VerifyOtpComponent implements OnInit {
  state$ = inject(Store).select(REDUCERS.GLOBAL_STATE_REDUCER);
  isSmall = false;
  otpInput1 = '';
  otpInput2 = '';
  otpInput3 = '';
  inputRegex = /\d/

   ngOnInit(): void {
    this.state$.subscribe((screenSize) => {
      const screen = screenSize.screenSize;
      this.isSmall = screen === 'xsmall' || screen === 'small';
    });
  }

  onOtpChange(value: string, ref: HTMLInputElement) {
    const matches = this.inputRegex.test(value);
    if(matches) ref.focus()
  }
}
