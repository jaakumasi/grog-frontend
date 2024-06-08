import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActiveListService {
  public activeList = new BehaviorSubject<number>(0);

  setActiveList(listId: number) {
    this.activeList.next(listId);
  }
}
