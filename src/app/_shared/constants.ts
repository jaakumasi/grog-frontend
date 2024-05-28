export const BREAKPOINTS = {
  XSMALL: '(max-width: 599.98px)',
  SMALL: '(min-width: 600px) and (max-width: 959.98px)',
  MEDIUM: '(min-width: 960px) and (max-width: 1279.98px)',
  LARGE: '(min-width: 1280px) and (max-width: 1919.98px)',
  XLARGE: '(min-width: 1920px)',
};

export const REDUCERS = {
  GLOBAL_STATE_REDUCER: 'globalStateReducer',
};

export const SERVER_URL = 'http://127.0.0.1:3000';

export const STORAGE_KEYS = {
  TOKEN: 'token',
  EMAIL: 'email',
};

export const VERIFICATION_SCENARIO = {
  PASSWORD_RESET: 'password-reset',
  FORM_SIGNUP: 'form-signup',
  SOCIAL_SIGNUP: 'social-signup',
};

export const ENDPOINTS = {
  SIGNIN: '/auth/signin',
  GROC_LIST: '/groc-list',
};
