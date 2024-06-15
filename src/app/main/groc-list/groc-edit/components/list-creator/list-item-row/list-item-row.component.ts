import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FormControlComponent } from '../../../../../../_shared/components/form-control/form-control.component';
import { Item } from '../../../../../../_shared/types';
import { IconBtnComponent } from '../../../../../_shared/components/icon-btn/icon-btn.component';

/**
 * an item row with two inputs: item name & qty
 */
@Component({
  selector: 'app-list-item-row',
  standalone: true,
  imports: [FormControlComponent, IconBtnComponent, ReactiveFormsModule],
  templateUrl: './list-item-row.component.html',
  styleUrl: './list-item-row.component.scss',
})
export class ListItemRowComponent implements OnInit {
  @Input() listIndex: any = 0;
  @Input() itemData?: Item;
  @Output() removeItemEventEmitter = new EventEmitter<number>();

  formBuilder = inject(FormBuilder);
  store = inject(Store);

  listItemRowForm = this.formBuilder.group({
    name: [''],
    qty: [''],
  });

  ngOnInit(): void {
    console.log(this.itemData);
    if (this.itemData) {
      // @ts-ignore
      this.listItemRowForm.setValue(this.itemData);
    }
  }

  onRemoveItem() {
    /* dispatch event to parent so the item row can be removed */
    this.removeItemEventEmitter.emit(this.listIndex);
  }

  get itemName() {
    return this.listItemRowForm.get('name')?.value;
  }

  get itemQty() {
    return this.listItemRowForm.get('qty')?.value;
  }
}
