import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { SERVER_URL } from '../../../_shared/constants';
import { Observable } from 'rxjs';
import { ResponseObject } from '../../../_shared/types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  http = inject(HttpClient);

  handleSignup(body: any): Observable<HttpErrorResponse | ResponseObject> {
    return this.http.post<ResponseObject | HttpErrorResponse>(`${SERVER_URL}/auth/signup`, body);
  }

  handleSignin(body: any): Observable<HttpErrorResponse | ResponseObject> {
    return this.http.post<ResponseObject | HttpErrorResponse>(
      `${SERVER_URL}/auth/signin`,
      body
    );
  }

  handleOtpVerification(
    body: any
  ): Observable<HttpErrorResponse | ResponseObject> {
    return this.http.post<ResponseObject | HttpErrorResponse>(
      `${SERVER_URL}/auth/verify-otp`,
      body
    );
  }

  handleOtpRequest(body: {
    email: string;
  }): Observable<HttpErrorResponse | ResponseObject> {
    return this.http.post<ResponseObject | HttpErrorResponse>(
      `${SERVER_URL}/auth/request-otp`,
      body
    );
  }
}
