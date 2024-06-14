import { createAction, props } from '@ngrx/store';
import { GroceryList } from '../../../../_shared/types';

export const setActiveListAction = createAction(
  '[SET-ACTIVE-LIST-ITEM]',
  props<{ list: GroceryList }>()
);
