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
import { GroceryList, Item } from '../../../../../_shared/types';
import { IconBtnComponent } from '../../../../_shared/components/icon-btn/icon-btn.component';
import { GROC_LIST_REDUCERS } from '../../../_shared/constants';
import { ListItemRowComponent } from '../list-item-row/list-item-row.component';

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
  /* receives events to trigger a list item addition */
  @Input() onAddItem?: EventEmitter<null>;

  formBuilder = inject(FormBuilder);
  store = inject(Store);
  router = inject(Router);

  storeSubscription?: Subscription;

  /* creates a map of the items with each item record having a numeric key acting as an index */
  listItems: { [id: number]: Item } = {};

  listForm = this.formBuilder.group({
    mart: ['~'],
  });

  ngOnInit(): void {
    this.subToListStore();
    this.subToAddListItemEvent();
  }

  ngOnDestroy(): void {
    this.storeSubscription?.unsubscribe();
  }

  subToListStore() {
    this.storeSubscription = this.store
      .select(GROC_LIST_REDUCERS.LIST_ITEMS_REDUCER)
      .subscribe((listData: GroceryList) => {
        const items = listData.items;
        this.listForm.setValue({ mart: listData.mart });
        for (let item of items) {
          console.log(item);
          this.onAddListItem(item);
        }
      });
  }

  subToAddListItemEvent() {
    this.onAddItem?.subscribe(() => this.onAddListItem());
  }

  onAddListItem(item?: Item) {
    console.log('called');
    this.listItems[new Date().getTime() + Object.keys(this.listItems).length] =
      {
        name: item?.name ?? '',
        qty: item?.qty ?? 1,
      };
  }

  onRemoveItem(itemIndex: number) {
    console.log('remove: ', itemIndex);
    /* minimum list size = 1 */
    Object.keys(this.listItems).length !== 1 &&
      delete this.listItems[itemIndex];
  }

  get mart() {
    return this.listForm.get('mart')?.value;
  }
}
