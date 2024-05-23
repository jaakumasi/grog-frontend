export type ResponseObject = {
  statusCode: number;
  message: string;
  data?: {
    redirectTo: string;
    token: string;
  };
};
