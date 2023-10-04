import { Document, Types } from 'mongoose';

export default interface IProjectTask extends Document {
  _id?: string | Types.ObjectId;
  assignees: Types.ObjectId[];
  watchers: Types.ObjectId[];
  start_date: Date;
  end_date: Date;
  status: string;
  title: string;
  description?: string;
  priority?: string;
  attachments?: string[];
  deleted?: boolean;
}
