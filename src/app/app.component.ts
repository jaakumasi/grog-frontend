import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BreakpointObserverService } from './_shared/services/breakpoint-observer.service';
import { BREAKPOINTS, REDUCERS } from './_shared/constants';
import { Store } from '@ngrx/store';
import { SCREEN_SIZE } from './_shared/store/store.state';
import { updateScreenSize } from './_shared/store/store.actions';
import { BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  store = inject(Store);
  breakpointService = inject(BreakpointObserverService);
  isXSmallScreen = false;
  isSmallScreen = false;
  isMediumScreen = false;
  isLargeScreen = false;

  ngOnInit(): void {
    this.store.dispatch(
      updateScreenSize({ screen: this.breakpointService.intialScreenWidth() })
    );

    let screenSize: SCREEN_SIZE;
    this.breakpointService.observeMedia().subscribe((observer) => {
      if (!observer.matches) return;
      screenSize = this.getCurrentScreenWidth(observer);
      this.store.dispatch(updateScreenSize({ screen: screenSize }));
    });

    this.store
      .select(REDUCERS.GLOBAL_STATE_REDUCER)
      .subscribe((gstate) => console.log(gstate));
  }

  getCurrentScreenWidth(observer: BreakpointState): SCREEN_SIZE {
    let screenSize: SCREEN_SIZE;
    this.isXSmallScreen = observer.breakpoints[BREAKPOINTS.XSMALL];
    this.isSmallScreen = observer.breakpoints[BREAKPOINTS.SMALL];
    this.isMediumScreen = observer.breakpoints[BREAKPOINTS.MEDIUM];
    this.isLargeScreen = observer.breakpoints[BREAKPOINTS.LARGE];
    screenSize = observer.breakpoints[BREAKPOINTS.XSMALL]
      ? SCREEN_SIZE.xsmall
      : observer.breakpoints[BREAKPOINTS.SMALL]
      ? SCREEN_SIZE.small
      : observer.breakpoints[BREAKPOINTS.MEDIUM]
      ? SCREEN_SIZE.medium
      : SCREEN_SIZE.large;

    return screenSize;
  }
}
