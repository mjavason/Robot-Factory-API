import express from 'express';
const router = express.Router();
import { robotValidation } from '../../../validation';
import { robotController } from '../../../controllers';
import {
  processRequestBody,
  processRequestParams,
  processRequestQuery,
} from 'zod-express-middleware';

router.get('/search', processRequestQuery(robotValidation.find.query), robotController.find);

router.get('/:pagination', robotController.getAll);

router.post('/', processRequestBody(robotValidation.create.body), robotController.create);

router.post(
  '/ask/:id',
  [processRequestParams(robotValidation.ask.params), processRequestBody(robotValidation.ask.body)],
  robotController.findAnswer,
);

router.post(
  '/:id/train',
  [
    processRequestParams(robotValidation.train.params),
    processRequestBody(robotValidation.train.body),
  ],
  robotController.train,
);

router.patch('/:id', processRequestBody(robotValidation.update.body), robotController.update);

router.delete('/:id', processRequestParams(robotValidation.delete.params), robotController.delete);

export default router;
