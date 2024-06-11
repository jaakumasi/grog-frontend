import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { FormControlComponent } from '../../../../../_shared/components/form-control/form-control.component';
import { ListItemRowComponent } from '../list-item-row/list-item-row.component';
import { KeyValuePipe } from '@angular/common';
import { REDUCERS } from '../../constants';
import { IconBtnComponent } from '../../../../_shared/components/icon-btn/icon-btn.component';

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
export class ListCreatorComponent implements OnInit {
  /* receives events to trigger a list item addition */
  @Input() onAddItem?: EventEmitter<null>;

  formBuilder = inject(FormBuilder);
  store = inject(Store);

  listItems: { [id: number]: string } = {};

  listForm = this.formBuilder.group({
    mart: ['~'],
    item: this.formBuilder.array([]),
  });

  ngOnInit(): void {
    this.initListItems();
    this.subToListStore();
    this.subToAddListItemEvent();
  }

  initListItems() {
    this.listItems[0] = '';
  }

  subToListStore() {
    this.store
      .select(REDUCERS.LIST_ITEMS_REDUCER)
      .subscribe((value) =>{
        //  console.log(value)
        });
  }

  subToAddListItemEvent() {
    this.onAddItem?.subscribe(() => this.onAddListItem());
  }

  onAddListItem() {
    this.listItems[Object.keys(this.listItems).length] = '';
  }

  onRemoveItem(itemIndex: number) {
    /* minimum list size  = 1 */
    Object.keys(this.listItems).length !== 1 &&
      delete this.listItems[itemIndex];
  }

  get itemsArray() {
    return this.listForm.get('item') as FormArray;
  }
}
