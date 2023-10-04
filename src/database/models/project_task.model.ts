import { Schema, model } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
import { DATABASES } from '../../constants';
import IProjectTask from '../../interfaces/project_task.interface';

const projectTaskSchema = new Schema<IProjectTask>(
  {
    assignees: [
      {
        type: Schema.Types.ObjectId,
        ref: DATABASES.USER,
        autopopulate: true,
      },
    ],
    watchers: [
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
    status: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    priority: {
      type: String, // Low, Medium, High
    },
    attachments: [
      {
        type: String, // URL or file reference
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

projectTaskSchema.plugin(autopopulate);

const ProjectTaskModel = model<IProjectTask>(DATABASES.PROJECT_TASK, projectTaskSchema);

export default ProjectTaskModel;
