import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  inject
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { FormControlComponent } from '../../../../../_shared/components/form-control/form-control.component';
import { IconBtnComponent } from '../../../../_shared/components/icon-btn/icon-btn.component';
import { deleteListAction, updateListAction } from '../../store/store.actions';

@Component({
  selector: 'app-list-item-row',
  standalone: true,
  imports: [FormControlComponent, IconBtnComponent, ReactiveFormsModule],
  templateUrl: './list-item-row.component.html',
  styleUrl: './list-item-row.component.scss',
})
export class ListItemRowComponent implements OnInit, OnDestroy {
  @Input() listIndex: any = 0;
  @Output() removeItemEventEmitter = new EventEmitter<number>();
  /* emits a value of '1' when the qty field has an invalid input.
   * the qty field should only take numbers, but can't find a way to hide the arrows attached to numeric inputs. */
  @Output() defaultQtyValueEmitter = new EventEmitter<string>();

  formBuilder = inject(FormBuilder);
  store = inject(Store);

  qtyValue = '1';

  listItemRowFormSubscription?: Subscription;

  listItemRowForm = this.formBuilder.group({
    name: [''],
    qty: ['1'],
  });

  ngOnInit(): void {
    this.subToFormValueChanges();
  }

  ngOnDestroy(): void {
    this.listItemRowFormSubscription?.unsubscribe();
  }

  subToFormValueChanges() {
    this.listItemRowFormSubscription =
      this.listItemRowForm.valueChanges.subscribe((value) => {
        /* update the shared state when there are form updates */
        this.store.dispatch(
          updateListAction({
            // @ts-ignore
            item: {
              [this.listIndex]: value,
            },
          })
        );

        const qty = this.listItemRowForm.get('qty')?.value;
        const qty_num = Number(qty);
        if (qty && (isNaN(qty_num) || qty_num < 1)) {
          console.log('invalid');
          this.defaultQtyValueEmitter.emit('1');
        }
      });
  }

  onRemoveItem() {
    /* remove the item from the shared state */
    this.store.dispatch(
      deleteListAction({
        // @ts-ignore
        item: {
          [this.listIndex]: this.listItemRowForm.value,
        },
      })
    );
    /* dispatch event to parent so the item row can be removed */
    this.removeItemEventEmitter.emit(this.listIndex);
  }
}
