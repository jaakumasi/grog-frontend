import { createReducer, on } from '@ngrx/store';
import { globalState } from './store.state';
import { updateScreenSize, updateUser } from './store.actions';

export const globalStateReducer = createReducer(
  globalState,
  on(updateScreenSize, (state, action) => {
    return {
      ...state,
      screenSize: action.screen,
    };
  }),
  on(updateUser, (state, action) => {
    return {
      ...state,
      user: action.user,
    };
  })
);
