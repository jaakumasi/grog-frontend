import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ENDPOINTS, SERVER_URL } from '../../../_shared/constants';
import { Observable } from 'rxjs';
import { ResponseObject } from '../../../_shared/types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  http = inject(HttpClient);
  store = inject(Store);

  getGrocList(): Observable<ResponseObject | HttpErrorResponse> {
    return this.http.get<ResponseObject | HttpErrorResponse>(
      `${SERVER_URL}/${ENDPOINTS.GROC_LIST}`
    );
  }

  createGrocList(
    body: ResponseObject
  ): Observable<ResponseObject | HttpErrorResponse> {
    return this.http.post<ResponseObject | HttpErrorResponse>(
      `${SERVER_URL}/${ENDPOINTS.GROC_LIST}`,
      body
    );
  }

  updateGrocList(
    id: number,
    body: ResponseObject
  ): Observable<ResponseObject | HttpErrorResponse> {
    return this.http.patch<ResponseObject | HttpErrorResponse>(
      `${SERVER_URL}/${ENDPOINTS.GROC_LIST}${id}`,
      body
    );
  }

  deleteGrocList(id: number): Observable<ResponseObject | HttpErrorResponse> {
    return this.http.delete<ResponseObject | HttpErrorResponse>(
      `${SERVER_URL}/${ENDPOINTS.GROC_LIST}${id}`
    );
  }
}
