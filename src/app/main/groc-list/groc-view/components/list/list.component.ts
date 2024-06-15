import { DatePipe, NgStyle } from '@angular/common';
import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ENDPOINTS } from '../../../../../_shared/constants';
import { GroceryList } from '../../../../../_shared/types';
import { IconBtnComponent } from '../../../../_shared/components/icon-btn/icon-btn.component';
import { setActiveListAction } from '../../../_shared/store/store.actions';
import { ActiveListService } from '../../services/active-list.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [DatePipe, IconBtnComponent, NgStyle],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit, OnDestroy {
  activeListService = inject(ActiveListService);
  store = inject(Store);
  router = inject(Router);

  @Input() listData!: GroceryList;

  isExpanded = signal(false);
  itemsLength = signal(0);

  activeListSubscription?: Subscription;

  ngOnInit(): void {
    this.itemsLength?.set(this.listData.items.length);
    this.subToActiveList();
  }

  ngOnDestroy(): void {
    this.activeListSubscription?.unsubscribe();
  }

  subToActiveList() {
    this.activeListSubscription = this.activeListService.activeList.subscribe(
      (activeListId) => {
        if (this.listData.id !== activeListId) {
          this.isExpanded.set(false);
          return;
        }
        this.isExpanded.set(!this.isExpanded());
      }
    );
  }

  onExpand() {
    this.activeListService.activeList.next(this.listData.id);
  }

  async onEdit() {
    this.store.dispatch(setActiveListAction({ list: this.listData }));
    await this.router.navigateByUrl(ENDPOINTS.GROC_LIST_EDIT);
  }
}
