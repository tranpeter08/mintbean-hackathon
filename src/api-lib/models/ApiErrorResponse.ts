import {ApiResponse} from './ApiResponse';

export class ApiErrorResponse extends ApiResponse {
  message: string;
  error = true;
  constructor(message = 'Server Error', statusCode = 500) {
    super(null, statusCode);
    this.message = message;
  }
}
