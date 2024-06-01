import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
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

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenuContentsComponent],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  router = inject(Router);
  breakpointService = inject(BreakpointObserverService);
  state$ = inject(Store).select(REDUCERS.GLOBAL_STATE_REDUCER);

  title = signal('Groc. List');
  email = signal('');
  showMenu = signal(false);
  showMobileMenu = signal(false); // if false, show large screen menu
  screenSize!: SCREEN_SIZE;
  socialProvider = signal<SocialLoginProvider | null>(null);

  ngOnInit(): void {
    /* determine the header title from the url when a navigation is made */
    this.router.events.subscribe(() => {
      this.router.url.endsWith(ENDPOINTS.GROC_LIST)
        ? this.title.set('Groc. List')
        : this.router.url.endsWith(ENDPOINTS.GEO)
        ? this.title.set('Geo')
        : this.title.set('Stats');
    });

    /* get the global state obj. and set the fields required in the user's profile section
     * and the screen size used to check which profile menu to display*/
    this.state$.subscribe((state: GlobalState) => {
      // const userDetails = state.user as User;
      // this.email.set(userDetails.email);
      // if (userDetails.socialLoginProvider)
      // this.socialProvider.set(userDetails.socialLoginProvider);
      this.screenSize = state.screenSize;
    });

    
    // temp for testing
    this.email.set('bill@gmail.com');
    this.socialProvider.set({
      name: 'Bill Prady',
      profilePicUrl:
        'https://lh3.googleusercontent.com/a/ACg8ocIxHAiwwFbaKI4FDpQ3nYAF43SD99xSkwvsXCQcYc3CHx55cA=s96-c',
      provider: 'google',
    });
  }

  onShowMenu() {
    this.showMenu.set(true);
    if (this.screenSize === 'small' || this.screenSize === 'xsmall')
      this.showMobileMenu.set(true);
    else this.showMobileMenu.set(false);
  }
}
