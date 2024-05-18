import { createReducer, on } from '@ngrx/store';
import { globalState } from './store.state';
import { updateScreenSize } from './store.actions';

export const globalStateReducer = createReducer(
  globalState,
  on(updateScreenSize, (state, action) => {
    return {
      ...state,
      screenSize: action.screen,
    };
  })
);
