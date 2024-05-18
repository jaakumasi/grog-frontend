import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { globalStateReducer } from '../store.reducers';

export interface State {}

export const reducers: ActionReducerMap<State> = {
  globalStateReducer,
};

export const metaReducers: MetaReducer<State>[] = [];
