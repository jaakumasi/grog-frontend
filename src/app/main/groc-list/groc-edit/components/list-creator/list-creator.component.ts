import { KeyValuePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { FormControlComponent } from '../../../../../_shared/components/form-control/form-control.component';
import { ENDPOINTS } from '../../../../../_shared/constants';
import { LocalStorageService } from '../../../../../_shared/services/local-storage/local-storage.service';
import { GroceryList, Item } from '../../../../../_shared/types';
import { IconBtnComponent } from '../../../../_shared/components/icon-btn/icon-btn.component';
import {
  GROC_LIST_REDUCERS,
  GROC_LIST_STORAGE_KEYS,
} from '../../../_shared/constants';
import { clearActiveListAction } from '../../../_shared/store/store.actions';
import { ListItemRowComponent } from './list-item-row/list-item-row.component';

/**
 * creates a list with a mart name and a number of row items
 */
@Component({
  selector: 'app-list-creator',
  standalone: true,
  imports: [
    KeyValuePipe,
    FormControlComponent,
    IconBtnComponent,
    ListItemRowComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './list-creator.component.html',
  styleUrl: './list-creator.component.scss',
})
export class ListCreatorComponent implements OnInit, OnDestroy {
  @Input() onAddItemEvent?: EventEmitter<null>;
  @Input() onSaveListEvent?: EventEmitter<null>;
  @Input() onCancelListEvent?: EventEmitter<null>;

  formBuilder = inject(FormBuilder);
  store = inject(Store);
  router = inject(Router);
  localStorageService = inject(LocalStorageService);

  /* subscriptions */
  storeSubscription?: Subscription;
  addItemEventSubscription?: Subscription;
  saveListEventSubscription?: Subscription;
  cancelListEventSubscription?: Subscription;

  /* creates a map of the items with each item record having a numeric key acting as an index */
  listItems: { [id: number]: Item } = {};

  listForm = this.formBuilder.group({
    mart: ['~'],
  });

  ngOnInit(): void {
    this.subToListStore();
    this.subToListEvents();
  }

  ngOnDestroy(): void {
    this.storeSubscription?.unsubscribe();
  }

  /**
   * Gets the active list data from the store and creates a list using the data.
   * Persists the active list data obtained from the store if its present.
   */
  subToListStore() {
    this.storeSubscription = this.store
      .select(GROC_LIST_REDUCERS.LIST_ITEMS_REDUCER)
      .subscribe((listData: GroceryList) => {
        if (listData.items.length === 0) {
          const activeListData_local = this.localStorageService.getItem(
            GROC_LIST_STORAGE_KEYS.ACTIVE_LIST_DATA
          );
          if (activeListData_local) this.onPopulateList(activeListData_local);
          else this.onAddListItem();
        } else this.onPopulateList(listData);
      });
  }

  subToListEvents() {
    this.addItemEventSubscription = this.onAddItemEvent?.subscribe(() =>
      this.onAddListItem()
    );

    this.saveListEventSubscription = this.onSaveListEvent?.subscribe(
      async () => {
        // todo:
        await this.onCleanupAndNavigate();
      }
    );

    this.cancelListEventSubscription = this.onCancelListEvent?.subscribe(
      async () => {
        // todo:
        await this.onCleanupAndNavigate();
      }
    );
  }

  onAddListItem(item?: Item) {
    this.listItems[new Date().getTime() + Object.keys(this.listItems).length] =
      {
        name: item?.name ?? '',
        qty: item?.qty ?? 1,
      };
  }

  onPopulateList(listData: GroceryList) {
    const items = listData.items;
    this.listForm.setValue({ mart: listData.mart });
    for (let item of items) this.onAddListItem(item);
    this.localStorageService.saveItem(
      GROC_LIST_STORAGE_KEYS.ACTIVE_LIST_DATA,
      listData
    );
  }

  onRemoveItem(itemIndex: number) {
    /* minimum list size = 1 */
    Object.keys(this.listItems).length !== 1 &&
      delete this.listItems[itemIndex];
  }

  async onCleanupAndNavigate() {
    this.store.dispatch(clearActiveListAction());
    this.localStorageService.removeItem(
      GROC_LIST_STORAGE_KEYS.ACTIVE_LIST_DATA
    );
    await this.router.navigateByUrl(ENDPOINTS.GROC_LIST);
  }

  get mart() {
    return this.listForm.get('mart')?.value;
  }
}
