import { Request, Response } from 'express';
import { robotService, tensorflowNlpService } from '../services';
import { SuccessResponse, InternalErrorResponse, NotFoundResponse } from '../helpers/response';
import { MESSAGES } from '../constants';
import * as use from '@tensorflow-models/universal-sentence-encoder';
import { ObjectId } from 'mongoose';

class Controller {
  async create(req: Request, res: Response) {
    const data = await robotService.create(req.body);

    if (!data) return InternalErrorResponse(res);

    return SuccessResponse(res, data);
  }

  async getAll(req: Request, res: Response) {
    let pagination = parseInt(req.params.pagination);

    if (!pagination) pagination = 1;

    pagination = (pagination - 1) * 10;

    const data = await robotService.getAll(pagination);

    if (!data) return InternalErrorResponse(res);
    if (data.length === 0) return NotFoundResponse(res);

    return SuccessResponse(res, data);
  }

  async find(req: Request, res: Response) {
    const data = await robotService.find(req.query);

    if (!data) return InternalErrorResponse(res);
    if (data.length === 0) return NotFoundResponse(res);

    return SuccessResponse(res, data);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const data = await robotService.update({ _id: id }, req.body);

    if (!data) return NotFoundResponse(res);

    return SuccessResponse(res, data, MESSAGES.UPDATED);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const data = await robotService.softDelete({ _id: id });

    if (!data) return NotFoundResponse(res);

    return SuccessResponse(res, data, MESSAGES.DELETED);
  }

  // Admins only
  async hardDelete(req: Request, res: Response) {
    const { id } = req.params;
    const data = await robotService.hardDelete({ _id: id });

    if (!data) return NotFoundResponse(res);

    return SuccessResponse(res, data, MESSAGES.DELETED);
  }

  async train(req: Request, res: Response) {
    const id = req.params.id;
    let { question, answer } = req.body;
    let questionEmbedding: any;

    // Find the robot by ID
    const robot = await robotService.findOne({ _id: id });

    if (!robot) return NotFoundResponse(res, 'robot not found');

    try {
      await tensorflowNlpService.initialize();

      // Analyze and encode the question using the NLP service
      questionEmbedding = await tensorflowNlpService.analyzeText(question);
      question = questionEmbedding;

      // Save the question-answer pair to the robot's memory
      // Example: RobotModel.saveMemory(robotId, questionEmbedding, answer);
    } catch (error) {
      console.error(error);
      return InternalErrorResponse(res);
    }

    // Add the question-answer pair to the robot's memories
    robot.memories.push({ question, answer });

    // Save the updated robot
    await robot.save();

    return SuccessResponse(res, robot);
  }

  async findAnswer(req: Request, res: Response) {
    const { id } = req.params;
    const { question } = req.body; // Get the user's query from the request body

    try {
      // Initialize the Universal Sentence Encoder
      const model = await use.load();

      // Encode the user's query
      const queryEncoding = await model.embed(question);

      // Find the robot by ID
      const robot = await robotService.findOne({ _id: id });

      if (!robot) return NotFoundResponse(res, 'Robot not found');

      // Calculate similarity scores for each robot's memories
      const relevantPairs: Array<{
        robotId: string | ObjectId;
        question: string;
        answer: string;
        similarity: number;
      }> = [];

      for (const memory of robot.memories) {
        // Encode each memory's question
        const memoryEncoding = await model.embed(memory.question);

        // Calculate the similarity between the user's query and the memory's question
        const similarity = await queryEncoding
          .arraySync()
          .map((val: number[], idx: number) =>
            val.map((v, i) => v * memoryEncoding.arraySync()[idx][i]),
          )
          .reduce((acc: any, val: any) => acc + val, 0);

        // Store relevant pairs with their similarity scores
        relevantPairs.push({
          robotId: robot._id.toString(),
          question: memory.question,
          answer: memory.answer,
          similarity,
        });
      }

      // Sort relevant pairs by similarity score in descending order
      relevantPairs.sort((a, b) => b.similarity - a.similarity);

      return SuccessResponse(res, relevantPairs);
    } catch (error) {
      console.error(error);
      return InternalErrorResponse(res, 'An error occurred while finding the answer.');
    }
  }
}

export const robotController = new Controller();
