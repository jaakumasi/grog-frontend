export type GlobalState = {
  screenSize: SCREEN_SIZE;
};

export enum SCREEN_SIZE {
  'xsmall' = 'xsmall',
  'small' = 'small',
  'medium' = 'medium',
  'large' = 'large',
  'xlarge' = 'xlarge',
}

export const globalState: GlobalState = {
  screenSize: SCREEN_SIZE.small,
};
