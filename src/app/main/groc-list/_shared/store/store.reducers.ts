import { createReducer, on } from '@ngrx/store';
import { deleteListAction, updateListAction } from './store.actions';
import { listItemsState } from './store.state';

export const listItemsReducer = createReducer(
  listItemsState,
  on(updateListAction, (state, action) => {
    const itemIndex = Object.keys(action.item)[0];
    /* filtering the list makes it possible to remove the item from the items array if its present
     * before pushing the updates. The works fine for item insertions and updates */
    const filteredItems = state.items.filter(
      (item) => Object.keys(item)[0] !== itemIndex
    );
    filteredItems.push(action.item);

    return {
      items: filteredItems,
    };
  }),
  on(deleteListAction, (state, action) => {
    const itemIndex = Object.keys(action.item)[0];
    /* for deletions, the list is simply filtered */
    const filteredItems = state.items.filter(
      (item) => Object.keys(item)[0] !== itemIndex
    );
    return {
        items: filteredItems
    }
  })
);
