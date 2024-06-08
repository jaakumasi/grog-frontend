import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ENDPOINTS, REDUCERS } from '../../../../_shared/constants';
import { BreakpointObserverService } from '../../../../_shared/services/breakpoint-observer.service';
import {
  GlobalState,
  SCREEN_SIZE,
  SocialLoginProvider,
  User,
} from '../../../../_shared/types';
import { MenuContentsComponent } from './components/menu-contents/menu-contents.component';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenuContentsComponent],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  router = inject(Router);
  breakpointService = inject(BreakpointObserverService);
  state$ = inject(Store).select(REDUCERS.GLOBAL_STATE_REDUCER);

  title = signal('');
  email = signal('');
  showMenu = signal(false);
  showMobileMenu = signal(false); // if false, show large screen menu
  screenSize!: SCREEN_SIZE;
  socialProvider = signal<SocialLoginProvider | null>(null);

  /* subscriptions */
  routerEventsSubscription?: Subscription;
  stateSubscription?: Subscription;

  ngOnInit(): void {
    this.setHeaderTitle();

    /* determine the header title from the url when a navigation is made */
    this.subToRouterEvents();

    /* get the global state obj. and set the fields required in the user's profile section
     * and the screen size used to check which profile menu to display */
    this.subToGlobalState();
  }

  ngOnDestroy(): void {
    this.routerEventsSubscription?.unsubscribe();
    this.stateSubscription?.unsubscribe();
  }

  setHeaderTitle() {
    const url = this.router.url;

    const grocList = new RegExp(ENDPOINTS.GROC_LIST, 'i');
    const geo = new RegExp(ENDPOINTS.GEO, 'i');

    grocList.test(url)
      ? this.title.set('Groc. List')
      : geo.test(url)
      ? this.title.set('Geo')
      : this.title.set('Stats');
  }

  subToRouterEvents() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.setHeaderTitle());
  }

  subToGlobalState() {
    this.state$.subscribe((state: GlobalState) => {
      const userDetails = state.user as User;
      this.email.set(userDetails.email);
      if (userDetails.socialLoginProvider)
        this.socialProvider.set(userDetails.socialLoginProvider);
      this.screenSize = state.screenSize;
    });
  }

  onShowMenu() {
    this.showMenu.set(true);
    if (this.screenSize === 'small' || this.screenSize === 'xsmall')
      this.showMobileMenu.set(true);
    else this.showMobileMenu.set(false);
  }
}
