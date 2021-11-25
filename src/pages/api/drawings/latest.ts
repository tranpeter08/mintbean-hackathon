import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../database/connect';
import DrawingService from '../../../api-lib/services/DrawingService';
import { ApiResponse } from '../../../api-lib/models/ApiResponse';

export default async function latest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'GET') throw 'Invalid HTTP request method';
    const { db } = await connectToDatabase();
    const drawingService = new DrawingService(db);
    const drawings = await drawingService.getRecentDrawings();
    const statusCode = 200;

    res.status(statusCode).json(new ApiResponse({ drawings }, statusCode));
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: 'Bad Request' });
  }
}
