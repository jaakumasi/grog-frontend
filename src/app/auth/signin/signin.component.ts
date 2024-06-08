import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, NgZone, OnInit, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MessageBoxComponent } from '../../_shared/components/message-box/message-box.component';
import { ENDPOINTS, REDUCERS, STORAGE_KEYS } from '../../_shared/constants';
import { ResponseObject, User } from '../../_shared/types';
import { ActionBtnComponent } from '../_shared/components/action-btn/action-btn.component';
import { FormControlComponent } from '../_shared/components/form-control/form-control.component';
import { FormDividerComponent } from '../_shared/components/form-divider/form-divider.component';
import { GoogleAuthComponent } from '../_shared/components/google-auth/google-auth.component';
import { InvalidInputMessageComponent } from '../_shared/components/invalid-input-message/invalid-input-message.component';
import { ApiService } from '../_shared/services/api.service';
import { GoogleUser } from '../_shared/types/google-social-auth.interface';
import {
  FormSignupRequest,
  SocialSignupRequest,
} from '../_shared/types/requests.interfaces';
import { emailValidator } from '../_shared/validators/email.validator';
import { Store } from '@ngrx/store';
import { updateUser } from '../../_shared/store/store.actions';

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
  formBuilder = inject(FormBuilder);
  apiService = inject(ApiService);
  router = inject(Router);
  store = inject(Store);
  ngZone = inject(NgZone);

  signinForm!: FormGroup;
  isLarge = signal(false);
  isSubmitEnabled = signal(false);
  showHttpErrorResponse = signal(false);
  httpErrorMessage = signal('');
  isMakingRequest = signal(false);

  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, emailValidator]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

    this.signinForm?.valueChanges.subscribe(() =>
      this.isSubmitEnabled.set(this.signinForm.valid)
    );
  }

  onSignin(
    encodedUserCredentials: { credential: string; client_id: string } | null,
    isSocialSignin: boolean = false
  ) {
    this.onRequestStart();

    let requestBody: SocialSignupRequest | FormSignupRequest | {} = {};
    let decodedUser: GoogleUser;
    if (isSocialSignin) {
      decodedUser = this.decodeCredentials(encodedUserCredentials!);
      requestBody = {
        email: decodedUser.email,
        isSocialLogin: true,
        socialLoginProvider: {
          name: decodedUser.name,
          profilePictureUrl: decodedUser.picture,
          provider: 'google',
        },
      };
    } else {
      const email = this.signinForm.get('email')?.value;
      const password = this.signinForm.get('password')?.value;
      requestBody = {
        email,
        password,
        isSocialLogin: false,
      };
    }

    /* For users who's OTPs are unverified, the email is required during verification.
     * For form signins, the email would be available in the form email input.
     * For social signins, it'll be in the decoded user credential obj. */
    const formEmail = this.signinForm.get('email')?.value;
    if (!formEmail) this.saveEmail(decodedUser!.email);
    else this.saveEmail(formEmail);

    this.apiService.handleSignin(requestBody).subscribe({
      next: (response: any) => {
        this.handleSuccessResponse(response);
      },
      error: (response: HttpErrorResponse) => {
        this.handleErrorResponse(response);
      },
    });
  }

  saveEmail(email: string) {
    globalThis.window?.localStorage.setItem(STORAGE_KEYS.EMAIL, email);
  }

  saveToken(response: ResponseObject) {
    globalThis.window?.localStorage.setItem(
      STORAGE_KEYS.TOKEN,
      response.data!.token
    );
  }

  updateStore(user: User) {
    console.log(user);
    this.store.dispatch(updateUser({ user }));
  }

  async handleSuccessResponse(response: ResponseObject) {
    this.onRequestEnd();
    this.saveToken(response);
    const redirectTo = response.data?.redirectTo;
    this.updateStore(response.data?.user!);
    await this.ngZone.run(async () => {
      await this.router.navigate([redirectTo]);
    })
  }

  async handleErrorResponse(response: HttpErrorResponse) {
    const message = response.error.message;
    const redirectTo = response.error.data?.redirectTo;
    const scenario = response.error.data?.scenario;

    /* form the url based on whether a verification scenario is present in the response */
    let url = scenario && redirectTo ? [redirectTo, scenario] : [redirectTo];
    if (redirectTo) {
      await this.router.navigate(url, {
        queryParams: { message },
      });
      return;
    }

    this.onRequestEnd();
    this.showHttpErrorResponse.set(true);
    this.httpErrorMessage.set(message);
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

  decodeCredentials(credentials: {
    credential: string;
    client_id: string;
  }): GoogleUser {
    const payload = credentials.credential.split('.')[1];
    return JSON.parse(atob(payload));
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

  get passwordTooShort() {
    return (
      this.signinForm.get('password')?.touched &&
      this.signinForm.get('password')?.hasError('minlength')
    );
  }
}
