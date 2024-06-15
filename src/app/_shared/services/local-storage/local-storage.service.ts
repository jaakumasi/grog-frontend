import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  saveItem(key: string, value: any): void {
    globalThis.localStorage?.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any {
    const item = globalThis.localStorage?.getItem(key);
    if (item) return JSON.parse(item);
    else return item;
  }

  removeItem(key: string): void {
    globalThis.localStorage?.removeItem(key);
  }
}
