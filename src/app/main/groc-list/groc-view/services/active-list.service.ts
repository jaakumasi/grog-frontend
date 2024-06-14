import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActiveListService {
  /* keeps track of the active list (expand list) using the list id.
     purpose: only one list can be expanded at a time. */
  public activeList = new BehaviorSubject<number>(0);

  setActiveList(listId: number) {
    this.activeList.next(listId);
  }
}
