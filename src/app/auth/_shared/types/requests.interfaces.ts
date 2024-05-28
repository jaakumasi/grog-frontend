export interface FormSignupRequest {
  email: string;
  password: string;
  isSocialLogin: boolean;
}

export interface SocialSignupRequest {
  email: string;
  isSocialLogin: boolean;
  socialLoginProvider: {
    name: string;
    profilePictureUrl: string;
    provider: string;
  };
}
