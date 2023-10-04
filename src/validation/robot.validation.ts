import { z } from 'zod';
import { Types } from 'mongoose';

class RobotValidation {
  // Validation schema for creating a new robot
  create = {
    body: z.object({
      name: z.string(),
      creator: z.string().refine((value) => Types.ObjectId.isValid(value), {
        message: 'Invalid ObjectId format',
      }),
      // Add validations for other fields as needed
    }),
  };

  // Validation schema for updating an existing robot
  update = {
    params: z.object({
      id: z.string().refine((value) => Types.ObjectId.isValid(value), {
        message: 'Invalid ObjectId format',
      }),
    }),
    body: z.object({
      name: z.string().optional(),
      creator: z
        .string()
        .refine((value) => Types.ObjectId.isValid(value), {
          message: 'Invalid ObjectId format',
        })
        .optional(),
      // Add validations for other fields as needed
    }),
  };

  // Validation schema for updating an existing robot
  ask = {
    params: z.object({
      id: z.string().refine((value) => Types.ObjectId.isValid(value), {
        message: 'Invalid ObjectId format',
      }),
    }),
    body: z.object({
      question: z.string().optional(),
    }),
  };

  // Validation schema for deleting a robot
  delete = {
    params: z.object({
      id: z.string().refine((value) => Types.ObjectId.isValid(value), {
        message: 'Invalid ObjectId format',
      }),
    }),
  };

  // Validation schema for training a robot
  train = {
    params: z.object({
      id: z.string().refine((value) => Types.ObjectId.isValid(value), {
        message: 'Invalid ObjectId format',
      }),
    }),
    body: z.object({
      question: z.string().min(3),
      answer: z.string().min(3),
    }),
  };

  // Validation schema for searching for robots with specific criteria
  find = {
    query: z.object({
      _id: z
        .string()
        .refine((value) => Types.ObjectId.isValid(value), {
          message: 'Invalid ObjectId format',
        })
        .optional(),
      name: z.string().optional(),
      creator: z
        .string()
        .refine((value) => Types.ObjectId.isValid(value), {
          message: 'Invalid ObjectId format',
        })
        .optional(),
    }),
  };
}

export const robotValidation = new RobotValidation();
