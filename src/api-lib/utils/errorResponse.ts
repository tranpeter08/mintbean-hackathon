import {ApiError} from '../models/ApiError';
import {NextApiResponse} from 'next';
import {ApiErrorResponse} from '../models/ApiErrorResponse';

export function errorResponse(error: ApiError | unknown, res: NextApiResponse) {
  console.log(error);

  if (error instanceof ApiError) {
    const {message, statusCode} = error;
    return res
      .status(statusCode)
      .json(new ApiErrorResponse(message, statusCode));
  }

  return res.status(500).json(new ApiErrorResponse());
}
