import { DatePipe, NgStyle } from '@angular/common';
import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ENDPOINTS } from '../../../../../_shared/constants';
import { GroceryList } from '../../../../../_shared/types';
import { IconBtnComponent } from '../../../../_shared/components/icon-btn/icon-btn.component';
import { ActiveListService } from '../../services/active-list.service';
import { setActiveListAction } from '../../../_shared/store/store.actions';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [DatePipe, IconBtnComponent, NgStyle],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  activeListService = inject(ActiveListService);
  store = inject(Store);
  router = inject(Router);

  @Input() listData!: GroceryList;

  isExpanded = signal(false);
  itemsLength = signal(0);

  ngOnInit(): void {
    this.itemsLength?.set(this.listData.items.length);
    this.subToActiveList();
  }

  subToActiveList() {
    this.activeListService.activeList.subscribe((activeListId) => {
      if (this.listData.id !== activeListId) {
        this.isExpanded.set(false);
        return;
      }
      this.isExpanded.set(!this.isExpanded());
    });
  }

  onExpand() {
    this.activeListService.activeList.next(this.listData.id!);
  }

  async onEdit() {
    this.store.dispatch(setActiveListAction({ list: this.listData }));
    await this.router.navigateByUrl(ENDPOINTS.GROC_LIST_EDIT);
  }
}
