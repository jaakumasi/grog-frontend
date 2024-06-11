export type ListFormValue = {
  listIndex: number;
  name?: string | null | undefined;
  qty?: number | null | undefined;
};

export type ListItemsState = {
  items: Item[];
};

export type Item = {
  [id: number]: {
    name?: string | null;
    qty?: string | null;
  };
};
