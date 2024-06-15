import { BreakpointState } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  inject
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { BREAKPOINTS } from './_shared/constants';
import { BreakpointObserverService } from './_shared/services/breakpoint-observer/breakpoint-observer.service';
import { updateScreenSize } from './_shared/store/store.actions';
import { SCREEN_SIZE } from './_shared/types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  store = inject(Store);
  breakpointService = inject(BreakpointObserverService);

  screenSize!: SCREEN_SIZE;

  isXSmallScreen = false;
  isSmallScreen = false;
  isMediumScreen = false;
  isLargeScreen = false;
  isXLargeScreen = false;

  ngOnInit(): void {
    this.initScreenWidth();
    this.subToMediaObserver();
  }

  initScreenWidth() {
    this.store.dispatch(
      updateScreenSize({ screen: this.breakpointService.intialScreenWidth() })
    );
  }

  subToMediaObserver() {
    this.breakpointService.observeMedia().subscribe((observer) => {
      if (!observer.matches) return;
      this.screenSize = this.getCurrentScreenWidth(observer);
      this.store.dispatch(updateScreenSize({ screen: this.screenSize }));
    });
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
