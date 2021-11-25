import type { NextApiRequest, NextApiResponse } from 'next';
import Cloudinary from 'cloudinary';
import formidable from 'formidable';
import { connectToDatabase } from '../../database/connect';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import DrawingService from '../../api-lib/services/DrawingService';

export default withApiAuthRequired(async function upload(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'POST') throw 'Invalid HTTP request method';

    const cloudinary = Cloudinary.v2;
    const data: any = await new Promise(function (resolve, reject) {
      const form = new formidable.IncomingForm({ keepExtensions: true });
      form.parse(req, function (err, fields, files) {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });

    const { penData, file } = data?.fields;

    if (typeof penData === 'undefined' || typeof file === 'undefined')
      throw new Error('Missing required fields');

    const result: any = await cloudinary.uploader.upload(file);
    const { url } = result;
    const { db } = await connectToDatabase();
    const drawingService = new DrawingService(db);
    const { user } = getSession(req, res);

    const isSucces = drawingService.createDrawing({
      email: user.email,
      penData: data.fields.penData,
      url,
    });

    res.status(201).send({ success: isSucces });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: 'Bad Request' });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};
