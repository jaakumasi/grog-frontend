import { createAction, props } from '@ngrx/store';
import { SCREEN_SIZE } from './store.state';

export const updateScreenSize = createAction(
  'screen-size',
  props<{ screen: SCREEN_SIZE }>()
);
