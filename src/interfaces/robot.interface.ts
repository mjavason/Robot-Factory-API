import { Document, Types } from 'mongoose';

// Define the interface
export default interface IRobot extends Document {
  _id?: string | Types.ObjectId;
  creator: string | Types.ObjectId;
  memories: Array<{
    question: string;
    answer: string;
  }>;
  deleted?: boolean;
}
