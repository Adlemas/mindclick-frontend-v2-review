export interface BackendError {
  message: string;
  statusCode: number;
  errors?: Array<string>;
}
