import { createAction, props } from '@ngrx/store';
import { GroceryList, ListModificationState } from '../../../../_shared/types';

export const setActiveListAction = createAction(
  '[SET-ACTIVE-LIST-ITEM]',
  props<{ list: GroceryList }>()
);

export const clearActiveListAction = createAction('[CLEAR-ACTIVE-LIST-ITEM]');

export const modifyListStateAction = createAction(
  '[MODIFIY-LIST-STATE] MODDED/UNMODDED',
  props<ListModificationState>()
);
