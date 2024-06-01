import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  http = inject(HttpClient);
  store = inject(Store);

  getGrocList() {
       
  }
}
