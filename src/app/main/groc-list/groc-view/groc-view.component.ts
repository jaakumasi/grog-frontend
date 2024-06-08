import { AsyncPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  ElementRef,
  OnInit,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { LoaderComponent } from '../../../_shared/components/loader/loader.component';
import { NoDataComponent } from '../../../_shared/components/no-data/no-data.component';
import { GroceryList, ResponseObject } from '../../../_shared/types';
import { ContentBoxActionBtnsComponent } from '../../_shared/components/content-box-action-btns/content-box-action-btns.component';
import { ContentBoxComponent } from '../../_shared/components/content-box/content-box.component';
import { OutlineBtnComponent } from '../../_shared/components/outline-btn/outline-btn.component';
import { ApiService } from '../../_shared/services/api.service';
import { ListComponent } from './components/list/list.component';

@Component({
  selector: 'app-groc-view',
  standalone: true,
  imports: [
    AsyncPipe,
    ContentBoxComponent,
    ContentBoxActionBtnsComponent,
    ListComponent,
    LoaderComponent,
    NoDataComponent,
    OutlineBtnComponent,
  ],
  templateUrl: './groc-view.component.html',
  styleUrl: './groc-view.component.scss',
})
export class GrocViewComponent implements OnInit {
  apiService = inject(ApiService);

  isFetchingData = signal(true);
  showNoDataMessage = signal(false);
  grocLists = signal<GroceryList[]>([]);

  ngOnInit(): void {
    this.fetchData();
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
    const list = response.data?.list;
    this.showNoDataMessage.set(list?.length === 0);
    this.grocLists.set(list!);
  }

  handleErrorResponse(response: HttpErrorResponse) {
    this.onRequestEnd();
  }
}
