export type ResponseObject = {
  statusCode: number;
  message: string;
  data?: {
    redirectTo: string;
    token: string;
    scenario: VerificationScenario;
    user: User;
    list: []
  };
};

export enum VerificationScenario {
  passwordReset = 'password-reset',
  formSignup = 'form-signup',
  socialSignup = 'social-signup',
}

export type GlobalState = {
  screenSize: SCREEN_SIZE;
  user: User | {};
};

export type User = {
  email: string;
  groceryList: GroceryList[];
  otpVerified: true;
  socialLoginProvider: SocialLoginProvider;
};

export enum SCREEN_SIZE {
  'xsmall' = 'xsmall',
  'small' = 'small',
  'medium' = 'medium',
  'large' = 'large',
  'xlarge' = 'xlarge',
}

export type SocialLoginProvider = {
  name: string;
  profilePicUrl: string;
  provider: string;
};

export type GroceryList = {
  id?: number;
  mart: string;
  createdAt?: Date;
  item: Item[];
};

export type Item = {
  id: number;
  name: string;
  qty: number;
  unitPrice: number;
};
