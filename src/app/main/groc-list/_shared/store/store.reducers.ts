import { createReducer, on } from '@ngrx/store';
import { activeListItem } from './store.state';
import { setActiveListAction } from './store.actions';

export const listItemsReducer = createReducer(
  activeListItem,
  on(setActiveListAction, (__, action) => {
    return {
      ...action.list,
    };
  })
);
