export type ResponseObject = {
  statusCode: number;
  message: string;
  data?: {
    redirectTo: string;
    token: string;
    scenario: VerificationScenario
  };
};

export enum VerificationScenario {
  passwordReset = 'password-reset',
  formSignup = 'form-signup',
  socialSignup = 'social-signup'
}
