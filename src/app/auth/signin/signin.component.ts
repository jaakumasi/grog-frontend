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
import { ActionBtnComponent } from '../_shared/components/action-btn/action-btn.component';
import { FormControlComponent } from '../_shared/components/form-control/form-control.component';
import { FormDividerComponent } from '../_shared/components/form-divider/form-divider.component';
import { GoogleAuthComponent } from '../_shared/components/google-auth/google-auth.component';
import { InvalidInputMessageComponent } from '../_shared/components/invalid-input-message/invalid-input-message.component';
import { emailValidator } from '../_shared/validators/email.validator';

@Component({
  selector: 'app-signin',
  standalone: true,
  templateUrl: './signin.component.html',
  imports: [
    ActionBtnComponent,
    CommonModule,
    FormControlComponent,
    FormDividerComponent,
    GoogleAuthComponent,
    InvalidInputMessageComponent,
    MessageBoxComponent,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class SigninComponent implements OnInit {
  signinForm!: FormGroup;
  formBuilder = inject(FormBuilder);
  isLarge = false;
  isFormValid = false;

  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, emailValidator]],
      password: ['', [Validators.required]],
    });

    this.signinForm?.valueChanges.subscribe(
      (val) => (this.isFormValid = this.signinForm.valid)
    );
  }

  onSignin() {
    console.log(this.signinForm.value);
  }

  get emailRequired() {
    return (
      this.signinForm.get('email')?.touched &&
      this.signinForm.get('email')?.hasError('required')
    );
  }

  get emailPatternInvalid() {
    return (
      this.signinForm.get('email')?.touched &&
      this.signinForm.get('email')?.hasError('email')
    );
  }

  get passwordRequired() {
    return (
      this.signinForm.get('password')?.touched &&
      this.signinForm.get('password')?.hasError('required')
    );
  }
}
