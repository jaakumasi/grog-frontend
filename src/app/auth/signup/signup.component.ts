import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { MessageBoxComponent } from '../../_shared/components/message-box/message-box.component';
import { REDUCERS } from '../../_shared/constants';
import { ActionBtnComponent } from '../_shared/components/action-btn/action-btn.component';
import { FormControlComponent } from '../_shared/components/form-control/form-control.component';
import { GrogHeaderComponent } from '../_shared/components/grog-header/grog-header.component';
import { InvalidInputMessageComponent } from '../_shared/components/invalid-input-message/invalid-input-message.component';
import { emailValidator } from '../_shared/validators/email.validator';
import { passwordMatch } from '../_shared/validators/password-match.validator';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ActionBtnComponent,
    FormControlComponent,
    GrogHeaderComponent,
    InvalidInputMessageComponent,
    MessageBoxComponent,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  state$ = inject(Store).select(REDUCERS.GLOBAL_STATE_REDUCER);
  formBuilder = inject(FormBuilder);
  signupForm!: FormGroup;
  isSmall = false;
  isFormValid = false;

  ngOnInit(): void {
    this.state$.subscribe((screenSize) => {
      const screen = screenSize.screenSize;
      this.isSmall = screen == 'small' || screen === 'xsmall';
    });

    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, emailValidator]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    });

    this.signupForm.addValidators(passwordMatch);

    this.signupForm?.valueChanges.subscribe(
      (val) => (this.isFormValid = this.signupForm.valid)
    );
  }

  onSignup() {
    console.log(this.signupForm.value);
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
    )
  }
}
