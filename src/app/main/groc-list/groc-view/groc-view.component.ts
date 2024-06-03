import { NgStyle } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { LoaderComponent } from '../../../_shared/components/loader/loader.component';
import { NoDataComponent } from '../../../_shared/components/no-data/no-data.component';
import { GroceryList, ResponseObject } from '../../../_shared/types';
import { ApiService } from '../../_shared/services/api.service';
import { ListComponent } from './components/list/list.component';
import { ContentBoxComponent } from '../../_shared/components/content-box/content-box.component';

@Component({
  selector: 'app-groc-view',
  standalone: true,
  imports: [
    ContentBoxComponent,
    ListComponent,
    LoaderComponent,
    NoDataComponent,
    NgStyle,
  ],
  templateUrl: './groc-view.component.html',
  styleUrl: './groc-view.component.scss',
})
export class GrocViewComponent {
  apiService = inject(ApiService);

  isFetchingData = signal(true);
  showNoDataMessage = signal(false);
  grocLists = signal<GroceryList[]>([]);

  ngOnInit(): void {
    this.onRequestStart();
    this.apiService.getGrocList().subscribe({
      next: (response: any) => this.handleSuccessResponse(response),
      error: (response: HttpErrorResponse) =>
        this.handleErrorResponse(response),
    });
  }

  handleSuccessResponse(response: ResponseObject) {
    this.onRequestEnd();

    console.log(response);
    const list = response.data?.list;
    this.grocLists.set(list!);
    this.showNoDataMessage.set(list?.length === 0);
  }

  handleErrorResponse(response: HttpErrorResponse) {
    this.onRequestEnd();
    console.log(response);
  }

  onRequestStart() {
    this.isFetchingData.set(true);
  }

  onRequestEnd() {
    this.isFetchingData.set(false);
  }
}
