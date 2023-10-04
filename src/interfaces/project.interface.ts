import { Document, Types } from 'mongoose';

export default interface IProject extends Document {
  _id?: string | Types.ObjectId;
  creator: Types.ObjectId;
  members: Types.ObjectId[];
  start_date: Date;
  end_date: Date;
  states: string[];
  title: string;
  description?: string;
  tags?: string[];
  deleted?: boolean;
}
