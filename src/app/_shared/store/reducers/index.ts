import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { globalStateReducer } from '../store.reducers';
import { listItemsReducer } from '../../../main/groc-list/_shared/store/store.reducers';

export interface State {}

export const reducers: ActionReducerMap<State> = {
  globalStateReducer, listItemsReducer
};

export const metaReducers: MetaReducer<State>[] = [];
