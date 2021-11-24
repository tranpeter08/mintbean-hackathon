import {connectToDatabase} from '../../database/connect';
import {Db} from 'mongodb';
import {DrawingData} from '../../types';

export default class DrawingService {
  db: Db;

  constructor() {
    this.connectDb();
  }

  async connectDb() {
    const {db} = await connectToDatabase();
    this.db = db;
  }

  async getDrawings() {
    const results = await this.db
      .collection('drawings')
      .find({})
      .sort({_id: -1})
      .limit(48)
      .project({_id: true, url: true, penDataJson: true})
      .toArray();

    const drawings: DrawingData = JSON.parse(JSON.stringify(results));

    return drawings;
  }
}
