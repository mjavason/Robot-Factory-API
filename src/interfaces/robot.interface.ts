import { Document, Types } from 'mongoose';

// Define the interface
export default interface IRobot extends Document {
  _id?: string | Types.ObjectId;
  name: string;
  creator: string | Types.ObjectId;
  memories: Array<{
    question: any;
    answer: any;
  }>;
  deleted?: boolean;
}
