import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ENDPOINTS, SERVER_URL } from '../../../_shared/constants';
import { Observable } from 'rxjs';
import { ResponseObject } from '../../../_shared/types';
import { PasswordReset } from '../types/requests.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  http = inject(HttpClient);

  handleSignup(body: any) {
    return this.http.post(`${SERVER_URL}/${ENDPOINTS.SIGNUP}`, body);
  }

  handleSignin(body: any): Observable<HttpErrorResponse | ResponseObject> {
    return this.http.post<ResponseObject | HttpErrorResponse>(
      `${SERVER_URL}/${ENDPOINTS.SIGNIN}`,
      body
    );
  }

  handleOtpVerification(
    body: any
  ): Observable<HttpErrorResponse | ResponseObject> {
    return this.http.post<ResponseObject | HttpErrorResponse>(
      `${SERVER_URL}/${ENDPOINTS.OTP_VERIFICATION}`,
      body
    );
  }

  handleOtpRequest(body: {
    email: string;
  }): Observable<HttpErrorResponse | ResponseObject> {
    return this.http.post<ResponseObject | HttpErrorResponse>(
      `${SERVER_URL}/${ENDPOINTS.OTP_REQUEST}`,
      body
    );
  }

  handlePasswordRest(
    body: PasswordReset
  ): Observable<HttpErrorResponse | ResponseObject> {
    return this.http.post<ResponseObject | HttpErrorResponse>(
      `${SERVER_URL}/${ENDPOINTS.PASSWORD_RESET}`,
      body
    );
  }
}
