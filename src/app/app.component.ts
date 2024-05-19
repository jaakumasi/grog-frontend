import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BreakpointObserverService } from './_shared/services/breakpoint-observer.service';
import { BREAKPOINTS, REDUCERS } from './_shared/constants';
import { Store } from '@ngrx/store';
import { SCREEN_SIZE } from './_shared/store/store.state';
import { updateScreenSize } from './_shared/store/store.actions';
import { BreakpointState } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  store = inject(Store);
  breakpointService = inject(BreakpointObserverService);
  stateSubscription!: Subscription;
  screenSize!: SCREEN_SIZE;

  isXSmallScreen = false;
  isSmallScreen = false;
  isMediumScreen = false;
  isLargeScreen = false;
  isXLargeScreen = false;

  ngOnInit(): void {
    this.store.dispatch(
      updateScreenSize({ screen: this.breakpointService.intialScreenWidth() })
    );

    this.breakpointService.observeMedia().subscribe((observer) => {
      if (!observer.matches) return;
      this.screenSize = this.getCurrentScreenWidth(observer);
      this.store.dispatch(updateScreenSize({ screen: this.screenSize }));
    });

    this.stateSubscription = this.store
      .select(REDUCERS.GLOBAL_STATE_REDUCER)
      .subscribe((gstate) => console.log(gstate));

    console.log(this.screenSize);
  }

  ngOnDestroy(): void {
    this.stateSubscription.unsubscribe();
  }

  getCurrentScreenWidth(observer: BreakpointState): SCREEN_SIZE {
    let screenSize: SCREEN_SIZE;
    this.isXSmallScreen = observer.breakpoints[BREAKPOINTS.XSMALL];
    this.isSmallScreen = observer.breakpoints[BREAKPOINTS.SMALL];
    this.isMediumScreen = observer.breakpoints[BREAKPOINTS.MEDIUM];
    this.isLargeScreen = observer.breakpoints[BREAKPOINTS.LARGE];
    this.isXLargeScreen = observer.breakpoints[BREAKPOINTS.LARGE];
    screenSize = observer.breakpoints[BREAKPOINTS.XSMALL]
      ? SCREEN_SIZE.xsmall
      : observer.breakpoints[BREAKPOINTS.SMALL]
      ? SCREEN_SIZE.small
      : observer.breakpoints[BREAKPOINTS.MEDIUM]
      ? SCREEN_SIZE.medium
      : observer.breakpoints[BREAKPOINTS.LARGE]
      ? SCREEN_SIZE.large
      : SCREEN_SIZE.xlarge;

    return screenSize;
  }
}
