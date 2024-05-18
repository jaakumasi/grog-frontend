import {
  BreakpointObserver,
  BreakpointState,
  Breakpoints,
} from '@angular/cdk/layout';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { SCREEN_SIZE } from '../store/store.state';
import { BREAKPOINTS } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class BreakpointObserverService {
  breakpointObserver = inject(BreakpointObserver);

  observeMedia(): Observable<BreakpointState> {
    return this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
    ]);
  }

  intialScreenWidth(): SCREEN_SIZE {
    return this.breakpointObserver.isMatched(BREAKPOINTS.XSMALL)
      ? SCREEN_SIZE.xsmall
      : this.breakpointObserver.isMatched(BREAKPOINTS.SMALL)
      ? SCREEN_SIZE.small
      : this.breakpointObserver.isMatched(BREAKPOINTS.MEDIUM)
      ? SCREEN_SIZE.medium
      : SCREEN_SIZE.large;
  }
}
