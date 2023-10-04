import { Schema, model } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
import { DATABASES } from '../../constants';
import IRobot from '../../interfaces/robot.interface';

// Define the schema
const robotSchema = new Schema<IRobot>(
  {
    name: {
      type: String,
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: DATABASES.USER,
      required: true,
      autopopulate: true,
    },
    memories: [
      {
        question: {
          // type: String | Number,
          // required: true,
        },
        answer: {
          // type: String | Number,
          // required: true,
        },
      },
    ],
    deleted: {
      type: Boolean,
      required: true,
      select: false,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Apply the autopopulate plugin to the schema
robotSchema.plugin(autopopulate);

// Define the model
const RobotModel = model('Robot', robotSchema);

export default RobotModel;
