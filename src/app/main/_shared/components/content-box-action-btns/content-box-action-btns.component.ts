import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { GlobalState, ListMode, SCREEN_SIZE } from '../../../../_shared/types';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { ENDPOINTS, REDUCERS } from '../../../../_shared/constants';
import { IconBtnComponent } from '../icon-btn/icon-btn.component';
import { OutlineBtnComponent } from '../outline-btn/outline-btn.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-content-box-action-btns',
  standalone: true,
  imports: [IconBtnComponent, OutlineBtnComponent],
  templateUrl: './content-box-action-btns.component.html',
})
export class ContentBoxActionBtnsComponent implements OnInit, OnDestroy {
  store = inject(Store);
  router = inject(Router);

  screenSize = signal<SCREEN_SIZE>(SCREEN_SIZE.small);
  mode = signal<ListMode>('add'); // determines the set of action buttons to display;

  globalStateSubscription?: Subscription;

  ngOnInit(): void {
    this.getScreenSize();
    this.setMode();

    console.log(this.screenSize());
    console.log(this.mode());
  }

  ngOnDestroy(): void {
    this.globalStateSubscription?.unsubscribe();
  }

  getScreenSize() {
    this.globalStateSubscription = this.store
      .select(REDUCERS.GLOBAL_STATE_REDUCER)
      .subscribe((state: GlobalState) => {
        this.screenSize.set(state.screenSize);
        console.log(this.screenSize());
      });
  }

  setMode() {
    const url = this.router.url;
    new RegExp(ENDPOINTS.GROC_LIST + '/view').test(url)
      ? this.mode.set('add')
      : this.mode.set('edit');
  }
}
