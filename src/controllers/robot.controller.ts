import { Request, Response } from 'express';
import { robotService, tensorflowNlpService } from '../services';
import { SuccessResponse, InternalErrorResponse, NotFoundResponse } from '../helpers/response';
import { MESSAGES } from '../constants';

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
}

export const robotController = new Controller();
