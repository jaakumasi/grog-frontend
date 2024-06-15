import { createReducer, on } from '@ngrx/store';
import {
  clearActiveListAction,
  modifyListStateAction,
  setActiveListAction,
} from './store.actions';
import { activeListData, listModificationState } from './store.state';

export const listItemsReducer = createReducer(
  activeListData,
  on(setActiveListAction, (__, action) => ({
    ...action.list,
  })),
  on(clearActiveListAction, () => ({
    id: 0,
    mart: '',
    items: [],
  }))
);

export const listModificationStateReducer = createReducer(
  listModificationState,
  on(modifyListStateAction, (__, action) => ({
    modified: action.modified,
  }))
);
