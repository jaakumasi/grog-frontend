import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ENDPOINTS, REDUCERS } from '../../../../_shared/constants';
import { GlobalState, ListMode, SCREEN_SIZE } from '../../../../_shared/types';
import { IconBtnComponent } from '../icon-btn/icon-btn.component';
import { OutlineBtnComponent } from '../outline-btn/outline-btn.component';

@Component({
  selector: 'app-content-box-action-btns',
  standalone: true,
  imports: [IconBtnComponent, OutlineBtnComponent],
  templateUrl: './content-box-action-btns.component.html',
})
export class ContentBoxActionBtnsComponent implements OnInit, OnDestroy {
  store = inject(Store);
  router = inject(Router);

  @Output() newListEvent = new EventEmitter<null>();  
  @Output() saveListEvent = new EventEmitter<null>();
  @Output() cancelListEvent = new EventEmitter<null>();
  @Output() addListItemEvent = new EventEmitter<null>();

  screenSize = signal<SCREEN_SIZE>(SCREEN_SIZE.small);
  mode = signal<ListMode>('add'); // determines the set of action buttons to display;

  viewListRoute = ENDPOINTS.GROC_LIST;
  newListRoute = ENDPOINTS.GROC_LIST_NEW;
  editListRoute = ENDPOINTS.GROC_LIST_EDIT;

  globalStateSubscription?: Subscription;

  ngOnInit(): void {
    this.getScreenSize();
    this.setMode();
  }

  ngOnDestroy(): void {
    this.globalStateSubscription?.unsubscribe();
  }

  getScreenSize() {
    this.globalStateSubscription = this.store
      .select(REDUCERS.GLOBAL_STATE_REDUCER)
      .subscribe((state: GlobalState) => this.screenSize.set(state.screenSize));
  }

  setMode() {
    const url = this.router.url;
    new RegExp(ENDPOINTS.GROC_LIST + '/view').test(url)
      ? this.mode.set('add')
      : this.mode.set('edit');
  }
}
