import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { globalStateReducer } from '../store.reducers';
import {
  listItemsReducer,
  listModificationStateReducer,
} from '../../../main/groc-list/_shared/store/store.reducers';

export interface State {}

export const reducers: ActionReducerMap<State> = {
  globalStateReducer,
  listItemsReducer,
  listModificationStateReducer,
};

export const metaReducers: MetaReducer<State>[] = [];
