type GlobalState = {
  screenSize: SCREEN_SIZE;
};

export enum SCREEN_SIZE {
  'xsmall' = 'xsmall',
  'small' = 'small',
  'medium' = 'medium',
  'large' = 'large',
}

export const globalState: GlobalState = {
  screenSize: SCREEN_SIZE.small,
};
