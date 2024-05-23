import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { SERVER_URL } from '../../../_shared/constants';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  http = inject(HttpClient);

  handleSignup(body: any) {
    return this.http.post(`${SERVER_URL}/auth/signup`, body);
  }

  handleSignin(body: any) {
    return this.http.post(`${SERVER_URL}/auth/signin`, body);
  }

  handleOtpVerification(body: any) {
    return this.http.post(`${SERVER_URL}/auth/verify-otp`, body);
  }

  handleOtpRequest(body: { email: string }) {
    return this.http.post(`${SERVER_URL}/auth/request-otp`, body);
  }
}
