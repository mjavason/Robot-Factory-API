import { Schema, model } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
import { DATABASES } from '../../constants';
import IProject from '../../interfaces/project.interface';

const projectSchema = new Schema<IProject>(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: DATABASES.USER,
      required: true,
      autopopulate: true,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: DATABASES.USER,
        autopopulate: true,
      },
    ],
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    states: [
      {
        type: String,
        required: false,
        default: ['To Do', 'In Progress', 'Done'],
      },
    ],
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    tags: [
      {
        type: String,
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

projectSchema.plugin(autopopulate);

const ProjectModel = model<IProject>(DATABASES.PROJECT, projectSchema);

export default ProjectModel;
