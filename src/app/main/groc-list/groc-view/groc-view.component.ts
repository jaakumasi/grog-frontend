import { AsyncPipe, NgStyle } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { LoaderComponent } from '../../../_shared/components/loader/loader.component';
import { NoDataComponent } from '../../../_shared/components/no-data/no-data.component';
import {
  GlobalState,
  GroceryList,
  ResponseObject,
  SCREEN_SIZE,
} from '../../../_shared/types';
import { ApiService } from '../../_shared/services/api.service';
import { ListComponent } from './components/list/list.component';
import { ContentBoxComponent } from '../../_shared/components/content-box/content-box.component';
import { Store } from '@ngrx/store';
import { REDUCERS } from '../../../_shared/constants';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-groc-view',
  standalone: true,
  imports: [
    AsyncPipe,
    ContentBoxComponent,
    ListComponent,
    LoaderComponent,
    NoDataComponent,
  ],
  templateUrl: './groc-view.component.html',
  styleUrl: './groc-view.component.scss',
})
export class GrocViewComponent implements OnInit, OnDestroy {
  smallScreenGridRef = viewChild<ElementRef>('smallScreenGrid');
  largeScreenGridRef_1 = viewChild('largeScreenGrid_1');
  largeScreenGridRef_2 = viewChild('largeScreenGrid_2');

  apiService = inject(ApiService);
  store = inject(Store);

  isFetchingData = signal(true);
  showNoDataMessage = signal(false);
  screenSize = signal<SCREEN_SIZE>(SCREEN_SIZE.small);
  grocLists = signal<GroceryList[]>([]);

  globalStateSubscription?: Subscription;

  ngOnInit(): void {
    this.getScreenSize();
    this.fetchData();
  }

  ngOnDestroy(): void {
    if (this.globalStateSubscription)
      this.globalStateSubscription.unsubscribe();
  }

  getScreenSize() {
    this.globalStateSubscription = this.store
      .select(REDUCERS.GLOBAL_STATE_REDUCER)
      .subscribe((state: GlobalState) => {
        this.screenSize.set(state.screenSize);
        console.log(this.screenSize());
      });
  }

  fetchData() {
    this.onRequestStart();
    this.apiService.getGrocList().subscribe({
      next: (response: any) => this.handleSuccessResponse(response),
      error: (response: HttpErrorResponse) =>
        this.handleErrorResponse(response),
    });
  }

  onRequestStart() {
    this.isFetchingData.set(true);
  }

  onRequestEnd() {
    this.isFetchingData.set(false);
  }

  handleSuccessResponse(response: ResponseObject) {
    this.onRequestEnd();
    // console.log(response);
    const list = response.data?.list;
    this.showNoDataMessage.set(list?.length === 0);
    this.grocLists.set(list!);
    this.gridifyData();
  }

  handleErrorResponse(response: HttpErrorResponse) {
    this.onRequestEnd();
    // console.log(response);
  }

  gridifyData() {
    const isSmallScreen =
      this.screenSize() === 'small' || this.screenSize() === 'xsmall';
    let isLeftGridActive = true;
    this.grocLists().forEach((list) => {
      const listCard = document.createElement('app-list');
      if(isSmallScreen) this.smallScreenGridRef()?.nativeElement.insertAdjacentElement("")
    });
  }
}
