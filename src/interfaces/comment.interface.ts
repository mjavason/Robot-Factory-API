import { Document, Types } from 'mongoose';

export default interface IComment extends Document {
  _id?: string | Types.ObjectId;
  user: Types.ObjectId;
  content: string;
  attachments?: string[];
  project_task: Types.ObjectId;
  deleted?: boolean;
}
