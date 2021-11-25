import { connectToDatabase } from '../../database/connect';
import { Db, ObjectId } from 'mongodb';
import { DrawingData } from '../../types';

export default class DrawingService {
  private db: Db;
  drawingCollection = 'drawings';
  defaultfields = { _id: { $toString: '$_id' }, penData: true, url: true };

  constructor(db: Db) {
    this.db = db;
  }

  async getDrawings() {
    const results = await this.db
      .collection(this.drawingCollection)
      .find({})
      .sort({ _id: -1 })
      .limit(48)
      .project({ _id: true, url: true, penDataJson: true })
      .toArray();

    const drawings: DrawingData = JSON.parse(JSON.stringify(results));

    return drawings;
  }

  async createDrawing({ email, penData, url }) {
    const dbData = await this.db
      .collection(this.drawingCollection)
      .insertOne({ url, penData, email });

    return dbData.acknowledged;
  }

  async getDrawingById(id: string) {
    const _id = new ObjectId(id);
    const results = await this.db
      .collection(this.drawingCollection)
      .find({ _id })
      .project(this.defaultfields)
      .toArray();

    if (Array.isArray(results)) return results[0];
    return null;
  }

  async getDrawingsByEmail(email) {
    const fields = { ...this.defaultfields, penData: false };
    const results = await this.db
      .collection(this.drawingCollection)
      .find({ email })
      .project(fields)
      .toArray();

    return results;
  }
}
