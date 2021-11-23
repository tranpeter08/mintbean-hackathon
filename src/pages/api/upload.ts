import type {NextApiRequest, NextApiResponse} from 'next';
import Cloudinary from 'cloudinary';
import formidable from 'formidable';
import {connectToDatabase} from '../../database/mongodb';

export default async function upload(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'POST') throw 'Invalid HTTP request method';

    const cloudinary = Cloudinary.v2;

    const data: any = await new Promise(function (resolve, reject) {
      const form = new formidable.IncomingForm({keepExtensions: true});
      form.parse(req, function (err, fields, files) {
        if (err) return reject(err);
        resolve({fields, files});
      });
    });

    const result: any = await cloudinary.uploader.upload(data.fields.file);
    const {url} = result;

    const {db} = await connectToDatabase();
    const dbData = await db
      .collection('drawings')
      .insertOne({url, penData: data.fields.penData});

    res.status(201).send({success: dbData.acknowledged});
  } catch (error) {
    console.log(error);
    res.status(400).send({message: 'Bad Request'});
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
