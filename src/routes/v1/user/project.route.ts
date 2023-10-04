// import express from 'express';
// const router = express.Router();
// import { projectValidation } from '../../../validation';
// import { projectController } from '../../../controllers';
// import {
//   processRequestBody,
//   processRequestParams,
//   processRequestQuery,
// } from 'zod-express-middleware';

// router.get('/search', processRequestQuery(projectValidation.find.query), projectController.find);

// router.get('/:pagination', projectController.getAll);

// router.post('/', processRequestBody(projectValidation.create.body), projectController.create);

// router.patch('/:id', processRequestBody(projectValidation.update.body), projectController.update);

// router.delete(
//   '/:id',
//   processRequestParams(projectValidation.delete.params),
//   projectController.delete,
// );

// export default router;
