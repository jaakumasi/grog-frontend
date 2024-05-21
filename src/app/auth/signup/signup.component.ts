import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { REDUCERS } from '../../_shared/constants';
import { GrogHeaderComponent } from '../_shared/components/grog-header/grog-header.component';
import { RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { emailValidator } from '../_shared/validators/email.validator';
import { FormControlComponent } from '../_shared/components/form-control/form-control.component';
import { MessageBoxComponent } from '../../_shared/components/message-box/message-box.component';
import { ActionBtnComponent } from '../_shared/components/action-btn/action-btn.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ActionBtnComponent,
    FormControlComponent,
    GrogHeaderComponent,
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
      password: [Validators.required, Validators.minLength(8)],
      confirmPassword: [],
    });

    this.signupForm?.valueChanges.subscribe(
      (val) => (this.isFormValid = this.signupForm.valid)
    );
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
}
