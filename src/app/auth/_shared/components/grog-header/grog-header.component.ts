import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  GlobalState,
  SCREEN_SIZE,
} from '../../../../_shared/store/store.state';
import { BreakpointObserverService } from '../../../../_shared/services/breakpoint-observer.service';
import { Store } from '@ngrx/store';
import { REDUCERS } from '../../../../_shared/constants';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-grog-header',
  standalone: true,
  imports: [],
  templateUrl: './grog-header.component.html',
  styleUrl: './grog-header.component.scss',
})
export class GrogHeaderComponent implements OnInit, OnDestroy{
  state$ = inject(Store).select(REDUCERS.GLOBAL_STATE_REDUCER);
  stateSubscription!: Subscription;
  screenSize!: SCREEN_SIZE;

  ngOnInit(): void {
    this.stateSubscription = this.state$.subscribe((state: GlobalState) => {
      this.screenSize = state.screenSize;
    });
  }

  ngOnDestroy(): void {
    this.stateSubscription.unsubscribe();
  }
}
