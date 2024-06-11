import { createAction, props } from '@ngrx/store';
import { Item } from '../types';

export const updateListAction = createAction(
  '[INSERT/UPDATE LIST]',
  props<{ item: Item }>()
);

export const deleteListAction = createAction(
  '[DELETE LIST]',
  props<{ item: Item }>()
);
